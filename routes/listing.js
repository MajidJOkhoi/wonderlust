const express = require("express");
const router = express.Router();
const wrapasync = require("../utils/wrap.js");
const { isloggedIn, isOwner } = require("./middleware.js");
const {validatelistings} = require("./middleware.js");
const listingController = require("../controllers/listings.js");


// index and create routes

// router
//   .route("/")
//   .get(wrapasync(listingController.index))
//   // .post(isloggedIn, wrapasync(listingController.CreateListing));
//   .post((req, res)=>{
//     res.send(req.body);
//   })

// create and edit routes

// router
//   .route("/")
//   .get("/:id", wrapasync(listingController.ShowListing))
//   .put(
//     "/:id",
//     validatelistings,
//     isloggedIn,
//     isOwner,
//     wrapasync(listingController.updateListing)
//   ).delete(
//   "/:id",
//   isloggedIn,
//   isOwner,
//   wrapasync(listingController.deleteListing)
// );





// index routes
router.get("/", wrapasync(listingController.index));

// New Route : render form for creating a new listing
router.get("/new", isloggedIn, listingController.renderNewForm);

// Create Route : render form for creating a new listing
router.post("/", isloggedIn, wrapasync(listingController.CreateListing));

// Show Route : return a list based on id
router.get("/:id", wrapasync(listingController.ShowListing));

// edit Route : render form for editing
router.get(
  "/:id/edit",
  isloggedIn,
  isOwner,
  wrapasync(listingController.renderEdit)
);

// updated route : it updates current listings

router.put(
  "/:id",validatelistings,
  isloggedIn,
  isOwner,
  wrapasync(listingController.updateListing)
);

// delete routes : it delete listing from database

router.delete(
  "/:id",
  isloggedIn,
  isOwner,
  wrapasync(listingController.deleteListing)
);

module.exports = router;
