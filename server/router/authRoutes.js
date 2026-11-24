import express from "express";
import passport from "passport";
import bcrypt from "bcrypt";

import db from "../db.js";

const router = express.Router();
const saltRounds = 10;


router.post("/register", async (req , res) =>{
    const {
        fname, lname, dob, phone,  country,
        email, password, comfirmPassword
    }=req.body;

    let client;

    try{

        if(
            !fname ||!lname || !dob || !phone || !country ||
            !email || !password || !comfirmPassword
        ){
            return res.status(400).json({
                success: false,
                message: "Please complete all fields"
            });
        };

        if(password !== comfirmPassword){
            return res.status(400).json({
                success: false,
                message: "Password do not match"
            });
        }

        client= await db.connect();
          await client.query("BEGIN");

          const checkmail = await client.query(`SELECT * FROM users WHERE email = $1`,[email]);

          if(checkmail.rows.length > 0){
            await client.query("ROLLBACK");

            return res.status(400).json({
                success: false,
                message: "email already exist, please Log In"
            });

          }else{
            
             const storedPassword = await bcrypt.hash(password, saltRounds);

             const result = await client.query(`INSERT INTO users (email, password) VALUES($1, $2) RETURNING id`,
                [email, storedPassword]);

            const userid = result.rows[0].id

            await client.query(`INSERT INTO user_record (user_id, fname, lname, dob, phone_number, country ) VALUES($1, $2, $3, $4, $5, $6 )`, 
                [userid, fname, lname, dob, phone, country]);

             await client.query("COMMIT");

              return res.status(200).json({
                success: true,
                message: "Registeration Successfull"
              });
          }


    }catch(error){
        if(client){
            await client.query("Rollback");
        }
        console.error("Registeration error", error);
    }finally{
       if(client){
          client.release();
       }
    }
});

// ====== Login
router.post("/login", (req, res, next) =>{
    passport.authenticate("local", (err, user, info) =>{
        if(err){
            return res.status(500).json({message: "Server error during login"});
        }

        if(!user){
            return res.status(500).json({message: info?.message || "Invaild email or password"});
        }

        req.logIn(user, (loginErr) =>{
            if(loginErr){
                return res.status(500).json({message: "could not start a login seesion"})
            }

            return res.status(200).json({
                message: "Login Successfull",
                user,
            });
        });

    })(req, res, next);
});

// Changed from router.post to router.get
router.get("/check", (req, res) => {
    if (req.isAuthenticated()) {
        return res.json({
            isAuthenticated: true,
            user: req.user,
        });
    }

    return res.status(401).json({
        isAuthenticated: false,
    });
});








export default router;