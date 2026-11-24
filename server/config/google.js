import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import db from "../db.js";



passport.use(
    "google", 
    new GoogleStrategy({

    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:5000/api/google/callback",

}, async function (accessToken, refreshToken, profile, cb) {

    const email = profile.emails?.[0]?.value;
    const fname = profile.name?.givenName || "";
    const lname = profile.name?.familyName || "";

    let client;
    
    try{
         client= await db.connect();

        const existingResult = await client.query(
            `SELECT u.*,  
                ur.fname,
                ur.lname, 
                ur.dob,
                ur.phone_number,
                ur.country
            FROM users u 
            LEFT JOIN user_record ur ON u.id = ur.user_id
            WHERE u.email = $1
            `,[email]
        );

        if(existingResult.rows.length > 0){
            const { password: _, ...sefaUser } = existingResult.rows[0];
            return cb(null, sefaUser);
        }

        await client.query("BEGIN");

         const newUserResult = await client.query(
            "INSERT INTO users (email, password) VALUES ($1, $2) RETURNING id, email",
          [email, "google_oauth"]);

          const newUserid = newUserResult.rows[0].id;

          await client.query(
            "INSERT INTO user_record (user_id, fname, lname) VALUES($1, $2, $3)",
            [newUserid, fname, lname]);
            
         await client.query("COMMIT");

         const newUser ={
            id: newUserid,
            email,
            fname,
            lname,
         };

         return cb(null, newUser)

     }catch(error){
        if(client){
            await client.query("ROLLBACK");  
        }
        console.error("Google Auth Error", error);

     }finally{
        if(client){
            client.release();
        }
     }
}));
