import { Container, Pagination } from "@app/components/common";
import CustomPagination from "@app/components/common/Pagination/Pagination";
import { MovieList } from "@app/components/main/Movies"; // Named import
import { numberWithCommas } from "@app/helpers/helperFunctions";
import { useDocumentTitle, usePageSaver } from "@app/hooks";
import { fetchTrendingMovies } from "@app/redux/actions";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const TrendingMovies = () => {
  const { trendingMovies, isLoading } = useSelector((state) => ({
    trendingMovies: state.movies.trending,
    isLoading: state.misc.isLoading,
  }));
  const { currentPage, setCurrentPage } = usePageSaver();
  const dispatch = useDispatch();

  useDocumentTitle("Trending Movies | MOVIEVERSE");
  useEffect(() => {
    if (!trendingMovies) {
      dispatch(fetchTrendingMovies(currentPage));
    }
  }, [trendingMovies, currentPage, dispatch]);

  const handlePageChange = (page) => {
    if (trendingMovies?.page !== page && !isLoading) {
      dispatch(fetchTrendingMovies(page));
      setCurrentPage(page);
    }
  };

  return (
    <Container>
      <div className="movie__header">
        <div className="movie__header-title">
          <h1>Trending Movies</h1>
          <h3>{numberWithCommas(trendingMovies?.total_results || 0)} Movies</h3>
        </div>
      </div>
      <MovieList movies={trendingMovies?.results || []} templateCount={10} />
      {trendingMovies && (
        <CustomPagination
          activePage={trendingMovies.page}
          itemsCountPerPage={1}
          onChange={handlePageChange}
          pageRangeDisplayed={10}
          totalItemsCount={trendingMovies.total_pages}
          totalPage={trendingMovies.total_pages}
          infiniteScroll={true}
        />
      )}
    </Container>
  );
};

export default TrendingMovies;
