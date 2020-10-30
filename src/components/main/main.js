import React, { useState, useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import './main.scss';
import MainContent from '../content/main-content/MainContent';
import Spinner from '../spinner/spinner';
import SearchResult from '../content/searchResults/searchResults';
import { loadMoreMovies, setResponsePageNumber } from '../../redux/actions/movies';
import { pathURL } from '../../redux/actions/routes';

const Main = (props) => {
  const {
    loadMoreMovies,
    page,
    totalPages,
    setResponsePageNumber,
    movieType,
    searchResult,
    match,
    pathURL,
    errors
  } = props;
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(page);
  const mainRef = useRef();
  const bottomLineRef = useRef();

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 3000);
  }, []);

  useEffect(() => {
    pathURL(match.path, match.url);
    setResponsePageNumber(currentPage, totalPages);
    // loadMoreMovies('now_playing', currentPage);
    // eslint-disable-next-line
  }, [currentPage, totalPages]);

  const fetchData = () => {
    let pageNumber = currentPage;
    if (page < totalPages) {
      pageNumber += 1;
      setCurrentPage(pageNumber);
      loadMoreMovies(movieType, pageNumber);
    }
  };

  const handleScroll = () => {
    const conatainerHeight = mainRef.current.getBoundingClientRect().height;
    const { top: bottomLineTop } = bottomLineRef.current.getBoundingClientRect();
    if (bottomLineTop <= conatainerHeight) {
      fetchData();
    }
  };

  return (
    <>
      {!errors.message && !errors.statusCode && (
        <div className="main" ref={mainRef} onScroll={() => handleScroll()}>
          {loading ? (
            <Spinner />
          ) : (
            <>{searchResult && searchResult.length === 0 ? <MainContent /> : <SearchResult />}</>
          )}
          <div ref={bottomLineRef}></div>
        </div>
      )}
    </>
  );
};
Main.propTypes = {
  loadMoreMovies: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  totalPages: PropTypes.number.isRequired,
  setResponsePageNumber: PropTypes.func.isRequired,
  movieType: PropTypes.string.isRequired,
  list: PropTypes.array.isRequired,
  searchResult: PropTypes.array.isRequired,
  pathURL: PropTypes.func,
  match: PropTypes.object,
  errors: PropTypes.object
};
const mapStateToProps = (state) => ({
  list: state.movies.list,
  page: state.movies.page,
  totalPages: state.movies.totalPages,
  movieType: state.movies.movieType,
  searchResult: state.movies.searchResult,
  errors: state.errors
});

export default connect(mapStateToProps, { loadMoreMovies, setResponsePageNumber, pathURL })(Main);
