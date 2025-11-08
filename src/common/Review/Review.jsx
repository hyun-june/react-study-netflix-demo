import React, { useState } from "react";
import { useReviewData } from "../../hooks/useReviewData";
import { useParams } from "react-router-dom";
import "./Review.style.css";
import { Alert, Spinner } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown, faCaretUp } from "@fortawesome/free-solid-svg-icons";

const Review = () => {
  let { id } = useParams();
  const { data, isLoading, isError, error } = useReviewData({ id });
  // console.log("review",data)

  if (isLoading) {
    return (
      <div>
        <Spinner
          animation="border"
          variant="danger"
          style={{ width: "5rem", height: "5rem" }}
        />
      </div>
    );
  }
  if (isError) {
    return <Alert variant="danger">{error.message}</Alert>;
  }

  const topReview = data.results.slice(0, 5);
  // console.log(topReview);

  return (
    <div>
      {topReview?.map((review, index) => (
        <ReviewItem key={index} review={review} />
      ))}
    </div>
  );
};

const ReviewItem = ({ review }) => {
  const [reviewMore, setReviewMore] = useState(false);
  const text = reviewMore ? review.content : review.content.slice(0, 400);

  return (
    <div className="review-box">
      <h5>{review.author}</h5>
      <div className="review-content">
        {reviewMore ? `${text}` : `${text}...`}
      </div>
      <div onClick={() => setReviewMore(!reviewMore)}>
        {reviewMore ? (
          <FontAwesomeIcon icon={faCaretUp} />
        ) : (
          <FontAwesomeIcon icon={faCaretDown} />
        )}
      </div>
      <div className="review-date">{review.updated_at.slice(0, 10)}</div>
    </div>
  );
};

export default Review;
