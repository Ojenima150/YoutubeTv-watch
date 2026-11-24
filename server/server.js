import "dotenv/config"; // MUST BE LINE 1 so .env loads before google.js and session!
import express from "express";
import bodyParser from "body-parser";
import { fileURLToPath } from "node:url";
import path from "node:path";
import session from "express-session";
import passport from "passport";

// Import auth AFTER dotenv/config
import authRoutes from "./router/authRoutes.js";
import "./config/passport.js";
import "./config/google.js";

const app = express();
const port = 5000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(
  session({
    secret: process.env.SESSION_SECRET || "fallback_session_secret",
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
    },
  })
);

app.use(passport.initialize());
app.use(passport.session());

// Authentication routes
app.use("/api/auth", authRoutes);

// Google Auth routes
app.get(
  "/api/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

app.get(
  "/api/google/callback",
  passport.authenticate("google", {
    failureRedirect: "http://localhost:5173/login",
  }),
  (req, res) => {
    res.redirect("http://localhost:5173/DashApp");
  }
);

// Display information for Google & Local users
app.get("/api/user", (req, res) => {
  if (!req.isAuthenticated()) {
    return res.status(401).json({
      message: "user not authenticated",
    });
  }

  return res.status(200).json({
    user: req.user,
  });
});

// Frontend
app.use(express.static(path.join(__dirname, "../client/dist")));

app.get("/{*splat}", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/dist/index.html"));
});

app.listen(port, () => {
  console.log(`server is runing on http://localhost:${port}`);
});
