const Listing = require("../models/listing");
const {expresserror} = require("../utils/ExpressError");
const {listingSchema,reviewSchema} = require("../Schema");
const Review = require("../models/review");


module.exports.isloggedIn = (req, res, next) => {

  //  console.log(req.path," .. ", req.orginalUrl);

  if (!req.isAuthenticated()) {

    // redirect url 
    req.session.redirectUrl = req.originalUrl;
    req.flash("error", " You must be logged in to create listing ");
    return res.redirect("/login");
    
  }
  next();
};


module.exports.SavedRedirectUrl = (req,res,next) =>{
 if(req.session.redirectUrl){
  res.locals.redirectUrl = req.session.redirectUrl;
 }
 next(); 
}


module.exports.isOwner = async (req, res, next) => {
  let {id} = req.params;
  let listing = await Listing.findById(id);
  if(!listing.owner._id.equals(res.locals.currUser._id)){
  req.flash('error'," You have are no owner of this listing ");
  return res.redirect("/listings");
}
next();
}


module.exports.isReviewAuthor = async (req, res, next) => {
  let { reviewid } = req.params;
  let review;

  try {
    review = await Review.findById(reviewid);
  } catch (error) {
    console.error(error);
    req.flash('error', 'Something went wrong');
    return res.redirect('/listings');
  }

  if (!review) {
    req.flash('error', 'Review not found');
    return res.redirect('/listings');
  }

  if (!review.author || !review.author.equals(res.locals.currUser._id)) {
    req.flash('error', 'You are not the owner of this review');
    return res.redirect('/listings');
  }

  next();
};


module.exports.validatelistings = (req, res, next) => {
  let { error } = listingSchema.validate(req.body);
  if (error) {
    let errMsg = error.details.map((el) => el.message).join(",");
    throw new expresserror(400, errMsg);
  } else {
    next();
  }
};



module.exports.validateReview = (req, res, next) => {
  let { error } = reviewSchema.validate(req.body);
  if (error) {
    let errMsg = error.details.map((el) => el.message).join(",");
    throw new expresserror(400, errMsg);
  } else {
    next();
  }
};


