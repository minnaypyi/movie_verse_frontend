import { Pagination } from '@app/components/common';
import CustomPagination from '@app/components/common/Pagination/Pagination';
import { MovieList } from '@app/components/main';
import { searchTvShows } from '@app/redux/actions';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';

const SearchTvTab = () => {
  const dispatch = useDispatch();
  const { query } = useParams();
  const { tvShows, isLoading } = useSelector(state => ({
    tvShows: state.search.tv,
    isLoading: state.misc.isLoading
  }));

  const handlePageChange = (page) => {
    if (tvShows?.page !== page && !isLoading) {
      dispatch(searchTvShows(query, page));
    }
  };

  return tvShows && tvShows.results.length !== 0 ? (
    <>
      <MovieList category="tv" movies={tvShows.results} />
      <Pagination
        activePage={tvShows.page}
        itemsCountPerPage={1}
        onChange={handlePageChange}
        pageRangeDisplayed={10}
        totalItemsCount={tvShows.total_pages}
        totalPage={tvShows.total_pages}
      />
    </>
  ) : (
    <div className="search__no-result">
      <h1>No TV show found.</h1>
      <i className="fa fa-theater-masks" />
    </div>
  );
};

export default SearchTvTab;
