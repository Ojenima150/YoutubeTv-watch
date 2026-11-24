import env from "dotenv";
import pg from "pg";

env.config();

const {Pool} = pg

const db = new Pool({
    user: process.env.PG_USER,
    host: process.env.PG_HOST,
    database: process.env.PG_DATABASE,
    password: String (process.env.PG_PASSWORD),
    port: process.env.PG_PORT
    ? parseInt (process.env.PG_PORT)
    : 5432
});

db.connect()
.then(client =>{
    console.log("postgres connection successfull");
    client.release();
})
  .catch(error =>{
    console.log("postgres connection failed", error.message)
  });



export default db;