const express = require("express");
const router = express.Router({ mergeParams: true });
const wrapasync = require("../utils/wrap.js");


const {
  validateReview,
  isloggedIn,
  isReviewAuthor,
} = require("./middleware.js");

const ReviewController = require("../controllers/reviews.js");

// Reviews
//  Post Reviews

router.post(
  "/",
  validateReview,
  isloggedIn,
  wrapasync(ReviewController.createReview)
);

//  Delete reviews Routes

router.delete(
  "/:reviewid",
  isloggedIn,
  isReviewAuthor,
  wrapasync(ReviewController.deleteReview)
);

module.exports = router;
