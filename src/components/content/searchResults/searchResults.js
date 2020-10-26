import React, { useState, useEffect, Fragment } from 'react';
import { connect } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import PropTypes from 'prop-types';
import Rating from '../rating/rating';
import { Link } from 'react-router-dom';
import '../grid/grid.scss';
import './searchResults.scss';
import { IMAGE_URL } from '../../../services/service';
import LazyImage from '../lazy-image/lazyImage';

const SearchResult = (props) => {
  const { searchResult, searchQuery } = props;
  const [movieData, setMovieData] = useState([]);

  useEffect(() => {
    setMovieData(searchResult);
  }, [searchResult]);

  const formatMovieTitle = (title) => {
    const titleStr = title.toLowerCase();
    return titleStr.replace(/ /g, '-');
  };

  return (
    <div className="searchkeyword">
      <div className="grid-search-title">
        <span className="grid-text1">Your search keyword</span>
        <span className="grid-text2">{searchQuery}</span>
      </div>
      <div className="grid">
        {movieData.map((data) => (
          <Fragment key={uuidv4()}>
            {data.poster_path && (
              <LazyImage
                className="grid-cell"
                src={`${IMAGE_URL}${data.poster_path}`}
                alt="placeholder"
              >
                <div className="grid-read-more">
                  <button className="grid-cell-button"></button>
                  <Link to={`/${data.id}/${formatMovieTitle(data.title)}/details`}>Read More</Link>
                </div>
                <div className="grid-detail">
                  <span className="grid-detail-title">{data.title}</span>
                  <div className=" grid-detail-rating">
                    <Rating rating={data.vote_average} totalStars={10} />
                    &nbsp;&nbsp;
                    <div className="grid-vote-avrage">{data.vote_average}</div>
                  </div>
                </div>
              </LazyImage>
            )}
          </Fragment>
        ))}
      </div>
    </div>
  );
};
SearchResult.propTypes = {
  searchResult: PropTypes.array.isRequired,
  searchQuery: PropTypes.string.isRequired
};
const mapStateToProps = (state) => ({
  searchResult: state.movies.searchResult,
  searchQuery: state.movies.searchQuery
});
export default connect(mapStateToProps, {})(SearchResult);
