const express = require("express");
const flash = require("connect-flash");
const app = express();
const path = require("path");

const session = require("express-session");

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

const sessionoption = {
  secret: "mysupersecretstring",
  resave: false,
  saveUninitialized: true,
};

app.use(session(sessionoption));
app.use(flash());

// count number of request

// app.get("/reqcount", (req, res) => {
//   if (req.session.count) {
//     req.session.count++;
//   } else {
//     req.session.count = 1;
//   }
//   res.send(` You have request ${req.session.count} times `);
// });

app.use((req,res,next)=>{
    res.locals.successmsg = req.flash("success");
    res.locals.errormsg = req.flash("error");
    next();
})
app.get("/register", (req, res) => {
  let { name = "anonymous" } = req.query;
  req.session.name = name;

  if (name === "anonymous") {
    req.flash("error", " User not register succesfully");
  } else {
    req.flash("success", " User register succesfully");
  }
  console.log(req.session.name);
  res.redirect("/hello");
});

app.get("/hello", (req, res) => {

  res.render("page.ejs", { name: req.session.name });
});

app.listen(3000, () => {
  console.log(" listen at port 3000 ");
});
