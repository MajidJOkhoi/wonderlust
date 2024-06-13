var express = require("express");
var app = express();

// for connect to database
const mongoose = require("mongoose");
const path = require("path");

// decrypt data stored in request
const bodyParser = require("body-parser");

// for override request
const methodOverride = require("method-override");

// for ejs templates
const engine = require("ejs-mate");
const expresserror = require("./utils/ExpressError.js");

//  require routes 
const listingsRouter = require("./routes/listing.js");
const reviewsRouter = require("./routes/review.js");
const userRouter = require("./routes/user.js");

// for flash messeges
const session = require("express-session");
const flash = require("connect-flash");

//  for authentication
const passport = require("passport");
const LocalStrategy = require("passport-local");
const User = require("./models/user.js");

app.use(bodyParser.urlencoded({ extended: true }));
// Parse JSON bodies (as sent by API clients)
app.use(bodyParser.json());
app.use(methodOverride("_method"));
app.use(express.static(path.join(__dirname, "/public")));
app.engine("ejs", engine);

//  for ejs engine setup

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

//  setup session and cookie
const sessionoption = {
  secret: "mysupersecretcode",
  resave: false,
  saveUninitialized: true,
  cookie: {
    expires: Date.now() + 7 * 24 * 60 * 60 * 1000,
    maxAge: 7 * 24 * 60 * 60 * 1000,
    httpOnly: true,
  },
};

main()
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => console.error(err));

async function main() {
  await mongoose.connect("mongodb://127.0.0.1/wonderlust");
}

app.get("/", (req, res) => {
  res.send(" server working ");
});

//  middle ware for setup flash and session
app.use(session(sessionoption));
app.use(flash());

// middle ware for passport initialization
//  intialize passport
app.use(passport.initialize());

//  identify users while browing page to page
app.use(passport.session());

// authenticate user while browsing pages
passport.use(new LocalStrategy(User.authenticate()));

// serialized user
passport.serializeUser(User.serializeUser());

// deserialized user

passport.deserializeUser(User.deserializeUser());

app.use((req, res, next) => {
  res.locals.success = req.flash("success");  
  res.locals.error = req.flash("error");
  res.locals.currUser = req.user;
  next();
});

// demo user

// app.get("/demouser", async (req, res) => {
//   let fakeUser = new User({
//     email: "student@example.com",
//     username: "majidali",
//   });

//  let registredUser =  await User.register(fakeUser, "helloworld");

//  res.send(registredUser);

// });

//  user Routers 
app.use("/listings", listingsRouter);
app.use("/listings/:id/reviews", reviewsRouter);
app.use("/",userRouter);



app.all("*", (req, res, next) => {
  next(new expresserror(404, " Page Not Found"));
});

app.use((err, req, res, next) => {
  let { statuscode = 500, message = " something went wrong .." } = err;
  res.render("listing/error.ejs", { err });
});

app.listen(4000, () => {
  console.log(" listening on port 4000 ");
});
