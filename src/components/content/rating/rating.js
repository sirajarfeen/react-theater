/* eslint-disable react/prop-types */
import React, { useState, useEffect, Fragment, useRef } from 'react';
import PropTypes from 'prop-types';
import './rating.scss';

const Rating = (props) => {
  const { rating, totalStars, className } = props;
  const [noOFStars, setnoOfStars] = useState();
  const ratingRef = useRef();
  useEffect(() => {
    const starsArray = [...Array(totalStars).keys()].map((i) => i + 1);
    setnoOfStars(starsArray);
    let percentage;
    if (rating <= 5) {
      percentage = (rating / 5) * 100;
    } else {
      percentage = (rating / 10) * 100;
    }
    const starPercentage = `${Math.floor(percentage)}%`;
    ratingRef.current.style.width = starPercentage;
  }, [rating, totalStars]);
  return (
    <div className="star-rating">
      <div className={`back-stars ${className}`}>
        {noOFStars &&
          noOFStars.map((i) => (
            <Fragment key={i}>
              <i className="fa fa-star" aria-hidden="true"></i>
            </Fragment>
          ))}
        <div className={`front-stars ${className}`} ref={ratingRef}>
          {noOFStars &&
            noOFStars.map((i) => (
              <Fragment key={i}>
                <i className="fa fa-star" aria-hidden="true"></i>
              </Fragment>
            ))}
        </div>
      </div>
    </div>
  );
};

Rating.prototype = {
  rating: PropTypes.number.isRequired,
  totalStars: PropTypes.number.isRequired,
  className: PropTypes.string
};

export default Rating;
