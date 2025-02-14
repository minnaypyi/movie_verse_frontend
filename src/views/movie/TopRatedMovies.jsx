import { Container, Pagination } from '@app/components/common';
import CustomPagination from '@app/components/common/Pagination/Pagination';
import { MovieList } from '@app/components/main/Movies'; // Named import
import { numberWithCommas } from '@app/helpers/helperFunctions';
import { useDocumentTitle, usePageSaver } from '@app/hooks';
import { fetchTopRatedMovies } from '@app/redux/actions';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const TopRatedMovies = () => {
  const { topRatedMovies, isLoading } = useSelector(state => ({
    topRatedMovies: state.movies.topRated,
    isLoading: state.misc.isLoading,
  }));
  const { currentPage, setCurrentPage } = usePageSaver();
  const dispatch = useDispatch();

  useDocumentTitle('Top Rated Movies | MOVX');
  useEffect(() => {
    if (!topRatedMovies) {
      dispatch(fetchTopRatedMovies(currentPage));
    }
  }, [dispatch, topRatedMovies, currentPage]);

  const handlePageChange = (page) => {
    if (topRatedMovies?.page !== page && !isLoading) {
      dispatch(fetchTopRatedMovies(page));
      setCurrentPage(page);
    }
  };

  return (
    <Container>
      <div className="movie__header">
        <div className="movie__header-title">
          <h1>Top Rated Movies</h1>
          <h3>{numberWithCommas(topRatedMovies?.total_results || 0)} Movies</h3>
        </div>
      </div>
      <MovieList
        movies={topRatedMovies?.results || []}
        templateCount={10}
      />
      {topRatedMovies && (
        <CustomPagination
          activePage={topRatedMovies.page}
          itemsCountPerPage={1}
          onChange={handlePageChange}
          pageRangeDisplayed={10}
          totalItemsCount={topRatedMovies.total_pages}
          totalPage={topRatedMovies.total_pages}
          infiniteScroll={true}
        />
      )}
    </Container>
  );
};

export default TopRatedMovies;
