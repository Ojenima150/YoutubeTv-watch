import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import bcrypt from "bcrypt";
import db from "../db.js";

passport.use(new LocalStrategy({
    usernameField: "email",
    passwordField: "password"
}, async function verify(email, password, cb) {
     
    let client;

    try{
        client = await db.connect();

        const checkmail = await client.query(
            `SELECT u.*,
               
                ur.fname,
                ur.lname,
                ur.dob,
                ur.phone_number,
                ur.country
            FROM users u
            LEFT JOIN user_record ur ON u.id = ur.user_id
            WHERE u.email = $1
            `,[email]);

            if(checkmail.rows.length === 0){
                return cb(null, false, {message: "email does not exist"});
            }

            const user = checkmail.rows[0];
            const storedPassword = user.password;

            const isMatch = await bcrypt.compare(password, storedPassword);

            if(!isMatch){
                return cb(null, false, {message: "Invaild email or password"});
            }


            const {password: _, ...sefaUser} = user;

            return cb(null, sefaUser);

    }catch(error){
        console.error("Login error", error);
        return cb(error)
    }finally{
        if(client){
            client.release();
        }
    }
})
);


passport.serializeUser((user, cb) => {
    cb(null, user);
});

passport.deserializeUser((user, cb) => {
    cb(null, user);
});