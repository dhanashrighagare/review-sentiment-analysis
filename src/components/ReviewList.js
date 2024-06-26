// ReviewList.js
import React from "react";
import reviewsData from "../reviews_data.json";
import ReviewHighlighter from "./ReviewHighlighter.js";

function ReviewList() {
  return (
    <div className="review-list w-full">
      {reviewsData.map((review) => (
        <ReviewHighlighter key={review.review_id} review={review} />
      ))}
    </div>
  );
}

export default ReviewList;
