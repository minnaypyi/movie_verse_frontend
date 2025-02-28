import { Container, Filter, Pagination } from "@app/components/common";
import CustomPagination from "@app/components/common/Pagination/Pagination";
import { MovieList } from "@app/components/main/Movies"; // Named import
import { numberWithCommas } from "@app/helpers";
import { useDidMount, useDocumentTitle, usePageSaver } from "@app/hooks";
import { fetchDiscoverMovies } from "@app/redux/actions";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const DiscoverMovies = () => {
  const { discoverMovies, filter } = useSelector((state) => ({
    discoverMovies: state.movies.discover,
    filter: state.filters.discover,
  }));
  const dispatch = useDispatch();
  const didMount = useDidMount();
  const { currentPage, setCurrentPage } = usePageSaver();

  useDocumentTitle("Discover Movies | MOVIEVERSE");
  useEffect(() => {
    if (!discoverMovies || didMount) {
      dispatch(fetchDiscoverMovies(currentPage));
    }
  }, [filter, discoverMovies?.page]);

  const handlePageChange = (page) => {
    if (discoverMovies?.page !== page) {
      dispatch(fetchDiscoverMovies(page));
      setCurrentPage(page);
    }
  };

  return (
    <Container>
      <div className="movie__header">
        <div className="movie__header-title">
          <h1>Discover Movies</h1>
          <h3>{numberWithCommas(discoverMovies?.total_results || 0)} Movies</h3>
        </div>
        {discoverMovies && <Filter filterCategory="discover" />}
      </div>
      <MovieList movies={discoverMovies?.results || []} templateCount={10} />
      {discoverMovies && (
        <CustomPagination
          activePage={discoverMovies.page}
          itemsCountPerPage={1}
          onChange={handlePageChange}
          pageRangeDisplayed={10}
          totalItemsCount={discoverMovies.total_pages}
          totalPage={discoverMovies.total_pages}
          infiniteScroll={true}
        />
      )}
    </Container>
  );
};

export default DiscoverMovies;
