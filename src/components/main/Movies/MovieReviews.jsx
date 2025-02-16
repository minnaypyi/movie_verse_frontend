import React from 'react';
import Collapsible from 'react-collapsible';
import { useSelector } from 'react-redux';

const MovieReviews = () => {
  const reviews = useSelector((state) => state.movies.current.reviews || []);

  return reviews.length === 0 ? null : (
    <div className="reviews">
      <div className="container__wrapper reviews__wrapper">
        <div className="reviews__header header__title">
          <h1>Reviews</h1>
        </div>
        {reviews?.map((review) => {
          
          const backgroundColorCode =
          review.reviewSentiment === "0" ? "#91535A" : // ✅ Red for 0 (Negative)
          review.reviewSentiment === "1"? "#54A065" : // ✅ Green for 1 (Positive)
          "transparent"; // ✅ Transparent for "NEUTRAL" or undefined
        return (
          <Collapsible
            easing="ease-in"
            key={`review_${review.id}`}
            transitionTime={300}
            trigger={review.author}
            style={{ background: backgroundColorCode }} // ✅ Apply background color
          >
            <div style={{ background: backgroundColorCode }}>
            <p>{review.content}</p>
            </div>
          </Collapsible>
  );
})}
      </div>
    </div>
  );
};

export default MovieReviews;
