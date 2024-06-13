const User = require("../models/user.js");


// render signup
module.exports.RenderSignup = (req, res) => {
  res.render("users/signup");
};

// render Login

module.exports.RenderLogin = (req, res) => {
  res.render("users/login");
};

// signup route

module.exports.SingupForm = async (req, res) => {
  try {
    let { username, email, password } = req.body;

    const newUser = new User({ email, username });

    const registredUser = await User.register(newUser, password);

    console.log(registredUser);

    req.login(registredUser, (err) => {
      if (err) {
        return next(err);
      }

      req.flash("success", " Wellcom to Wanderlust your login ");
      res.redirect("/listings");
    });
  } catch (e) {
    req.flash("error", e.message);
    res.redirect("/signup");
  }
};

// Login

module.exports.Login = async (req, res) => {
  req.flash("success", "Welcome Back to wonderlust Your are logged in ");

  let redirectUrl = req.session.redirectUrl || "/listings";

  res.redirect(redirectUrl);
};

// Logout

module.exports.Logout = (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    req.flash("success", " You are Log out ");
    res.redirect("/listings");
  });
};
