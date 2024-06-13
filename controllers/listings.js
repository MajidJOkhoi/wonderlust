const Listing = require("../models/listing.js");
const listingSchema = require("../Schema.js");

// index Route
module.exports.index = async (req, res) => {
  const alllisting = await Listing.find({});
  res.render("listing/index.ejs", { alllisting });
};

// new Route

module.exports.renderNewForm = async (req, res) => {
  res.render("listing/new.ejs");
};

// Create Route

module.exports.CreateListing = async (req, res, next) => {
  // let result = listingSchema.validate(req.body);
  //  console.log(result)

  let newlisting = new Listing(req.body.listing);

  newlisting.owner = req.user;

  await newlisting.save();
  req.flash("success", " New Listing Created Successfully ");

  res.redirect("/listings");
};

// show router

module.exports.ShowListing = async (req, res) => {
  let { id } = req.params;

  let listing = await Listing.findById(id)
    .populate({
      path: "reviews",
      populate: { path: "author" },
    })
    .populate("owner");

  if (!listing) {
    req.flash("error", " Listing You requested does not exist");
    res.redirect("/listings");
  }
  console.log(listing);
  res.render("listing/show.ejs", { listing });
};

// Edit Route

module.exports.renderEdit = async (req, res) => {
  let { id } = req.params;
  let listing = await Listing.findById(id);
  if (!listing) {
    req.flash("error", " Listing You requested does not exist");
    res.redirect("/listings");
  }
  res.render("listing/edit.ejs", { listing });
};

// Update Routes

module.exports.updateListing = async (req, res) => {
  let { id } = req.params;
  await Listing.findByIdAndUpdate(id, { ...req.body.listing });
  req.flash("success", " Listing Updated successfully ");
  res.redirect("/listings");
};


// delete Route
module.exports.deleteListing = async (req, res) => {
  let { id } = req.params;
  await Listing.findByIdAndDelete(id, { ...req.body.listing });
  req.flash("success", "Listing deleted");
  res.redirect("/listings");
};


