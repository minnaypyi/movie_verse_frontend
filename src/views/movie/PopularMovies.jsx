import { Container, Pagination } from "@app/components/common";
import CustomPagination from "@app/components/common/Pagination/Pagination";
import { MovieList } from "@app/components/main/Movies"; // Named import
import { numberWithCommas } from "@app/helpers";
import { useDocumentTitle, usePageSaver } from "@app/hooks";
import { fetchPopularMovies } from "@app/redux/actions";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const PopularMovies = () => {
  const { popularMovies, isLoading } = useSelector((state) => ({
    popularMovies: state.movies.popular,
    isLoading: state.misc.isLoading,
  }));
  const { currentPage, setCurrentPage } = usePageSaver();
  const dispatch = useDispatch();
  const route = "/movie/popular";

  useDocumentTitle("Popular Movies | MOVIEVERSE");
  useEffect(() => {
    if (!popularMovies) {
      console.log(currentPage);
      dispatch(fetchPopularMovies(currentPage));
    }
  }, [currentPage, popularMovies, dispatch]);

  const handlePageChange = (page) => {
    if (popularMovies?.page !== page && !isLoading) {
      dispatch(fetchPopularMovies(page));
      setCurrentPage(page);
    }
  };

  return (
    <Container>
      <div className="movie__header">
        <div className="movie__header-title">
          <h1>Popular Movies</h1>
          <h3>{numberWithCommas(popularMovies?.total_results || 0)} Movies</h3>
        </div>
      </div>
      <MovieList movies={popularMovies?.results || []} templateCount={10} />
      {popularMovies && (
        <CustomPagination
          activePage={popularMovies.page}
          itemsCountPerPage={1}
          onChange={handlePageChange}
          pageRangeDisplayed={10}
          totalItemsCount={popularMovies.total_pages}
          totalPage={popularMovies.total_pages}
          infiniteScroll={true}
        />
      )}
    </Container>
  );
};

export default PopularMovies;
