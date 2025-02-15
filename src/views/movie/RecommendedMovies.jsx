import { Container } from '@app/components/common';
import CustomPagination from '@app/components/common/Pagination/Pagination';
import { MovieList } from '@app/components/main/Movies'; // Named import
import { numberWithCommas } from '@app/helpers/helperFunctions';
import { useDocumentTitle, usePageSaver } from '@app/hooks';
import { fetchRecommendedMovies } from '@app/redux/actions';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom'; // Import useHistory

const RecommendedMovies = () => {
  const { recommendedMovies, isLoading } = useSelector(state => ({
    recommendedMovies: state.movies.recommended,
    isLoading: state.misc.isLoading,
  }));
  const { currentPage, setCurrentPage } = usePageSaver();
  const dispatch = useDispatch();
  const history = useHistory(); // Initialize useHistory hook

  useDocumentTitle('Recommended Movies | MOVIEVERSE');

  // Check if user is logged in, if not, redirect to login page
  useEffect(() => {
    const authToken = localStorage.getItem('authToken'); // Check if token exists in localStorage
      if (!authToken) {
          history.push('/login'); // Redirect to login if not logged in
      }
  }, [history]);

  useEffect(() => {
    if (!recommendedMovies) {
      dispatch(fetchRecommendedMovies(currentPage));
    }
  }, [recommendedMovies, currentPage, dispatch]);

  const handlePageChange = (page) => {
    if (recommendedMovies?.page !== page && !isLoading) {
      dispatch(fetchRecommendedMovies(page));
      setCurrentPage(page);
    }
  };
  console.log(recommendedMovies);
  return (
    <Container>
      <div className="movie__header">
        <div className="movie__header-title">
          <h1>Recommended Movies</h1>
          <h3>{numberWithCommas(recommendedMovies?.total_results || 0)} Movies</h3>
        </div>
      </div>
{/* 
        <MovieList
          movies={recommendedMovies?.results || []}
          templateCount={10}
        />
      
      {recommendedMovies && (
        <CustomPagination
          activePage={recommendedMovies.page}
          itemsCountPerPage={1}
          onChange={handlePageChange}
          pageRangeDisplayed={10}
          totalItemsCount={recommendedMovies.total_pages}
          totalPage={recommendedMovies.total_pages}
          infiniteScroll={true}
        />
      )} */}

      {/* Show a message if there are no recommended movies */}
      {recommendedMovies?.results?.length === 0 ? (
        <p>No recommended movies available at the moment. Make some interactions.</p>
      ) : (
        <>
          <MovieList
            movies={recommendedMovies?.results || []}
            templateCount={10}
          />
          
          {/* Only show pagination if there are movies */}
          {recommendedMovies?.total_results > 0 && (
            <CustomPagination
              activePage={recommendedMovies.page}
              itemsCountPerPage={1}
              onChange={handlePageChange}
              pageRangeDisplayed={10}
              totalItemsCount={recommendedMovies.total_pages}
              totalPage={recommendedMovies.total_pages}
              infiniteScroll={true}
            />
          )}
        </>
      )}
    </Container>
  );
};

export default RecommendedMovies;
