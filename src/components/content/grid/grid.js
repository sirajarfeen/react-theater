/* eslint-disable react/prop-types */
import React from 'react';
import Rating from '../rating/rating';
import './grid.scss';

const Grid = (props) => {
  const { images } = props;
  return (
    <>
      <div className="grid">
        {images.map((image, i) => (
          <div key={i}>
            <div className="grid-cell" style={{ backgroundImage: `url(${image.url})` }}>
              <div className="grid-read-more">
                <button className="grid-cell-button">Read More</button>
              </div>
              <div className="grid-detail">
                <span className="grid-detail-title">Missioon imps</span>
                <div className=" grid-detail-rating">
                  <Rating rating={image.rating} totalStars={10} />
                  &nbsp;&nbsp;
                  <div className="grid-vote-avrage">{image.rating}</div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default Grid;
