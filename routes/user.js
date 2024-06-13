const express = require("express");
const router = express.Router();

const wrapasync = require("../utils/wrap.js");

const passport = require("passport");

const { SavedRedirectUrl } = require("./middleware.js");

const userController = require("../controllers/users.js");

// render and signup routes
router
  .route("/signup")
  .get(userController.RenderSignup)
  .post(wrapasync(userController.SingupForm));

// render and login routes

router
  .route("/login")
  .get(userController.RenderLogin)
  .post(
    SavedRedirectUrl,
    passport.authenticate("local", {
      failureRedirect: "/login",
      failureFlash: true,
    }),
    userController.Login
  );

// // Render Signup Form
// router.get("/signup", userController.RenderSignup);

// Render Login Form
// router.get("/login", userController.RenderLogin);

// //  signup Route
// router.post("/signup", wrapasync(userController.SingupForm));

//  create user
// router.post(
//   "/login",
//   SavedRedirectUrl,
//   passport.authenticate("local", {
//     failureRedirect: "/login",
//     failureFlash: true,
//   }),
//   userController.Login
// );

router.get("/logout", userController.Logout);

module.exports = router;
