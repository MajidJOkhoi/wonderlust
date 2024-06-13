
const Review = require("../models/review.js");
const Listing = require("../models/listing.js");

// Post Route

module.exports.createReview = async (req, res) => {
  let listing = await Listing.findById(req.params.id);

  let newReview = new Review(req.body.review);
  newReview.author = req.user._id;
  console.log(newReview);
  listing.reviews.push(newReview);
  console.log(newReview);

  await newReview.save();
  await listing.save();

  req.flash("success", "new review created successfully ");

  res.redirect(`/listings/${listing._id}`);
};


//  delete review 

module.exports.deleteReview = async (req, res) => {
  let { id, reviewid } = req.params;

  await Listing.findByIdAndUpdate(id, { $pull: { reviews: reviewid } });

  await Review.findByIdAndDelete(reviewid);
  req.flash("success", " Review deleted successfully ");
  res.redirect(`/listings/${id}`);
};
