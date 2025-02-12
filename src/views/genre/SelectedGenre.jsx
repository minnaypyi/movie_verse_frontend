import Container from '@app/components/common/Container/Container';
import PaginationBar from '@app/components/common/Pagination/Pagination';
import MovieList from '@app/components/main/Movies/MovieList';
import { numberWithCommas } from '@app/helpers/helperFunctions';
import useDocumentTitle from '@app/hooks/useDocumentTitle';
import usePageSaver from '@app/hooks/usePageSaver';
import { fetchGenreCategory } from '@app/redux/actions/genreActions';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const SelectedGenre = ({ match }) => {
  console.log('SelectedGenre component rendered'); // Check if component is being rendered
  const { currentGenre, isLoading } = useSelector(state => ({
    currentGenre: state.genre.current,
    isLoading: state.misc.isLoading,
  }));
  const { currentPage, setCurrentPage } = usePageSaver();
  const dispatch = useDispatch();

  console.log('Current Genre:', currentGenre);

  useDocumentTitle('Genres | MOVX');
  useEffect(() => {
    console.log('Dispatching fetchGenreCategory');
    dispatch(fetchGenreCategory(match.params.id, currentPage));
  }, []);

  const handlePageChange = (page) => {
    if (currentGenre?.page !== page && !isLoading) {
      dispatch(fetchGenreCategory(match.params.id, page));
      setCurrentPage(page)
    }
  };

  return (
    <Container>
      <div className="movie__header">
        <div className="movie__header-title">
          <h1>{match.params.genre.replace('-', ' ')}</h1>
          <h3>{numberWithCommas(currentGenre?.total_results || 0)} Movies</h3>
        </div>
      </div>
      <MovieList
        category="movie"
        movies={currentGenre?.results || []}
        templateCount={10}
      />
      {currentGenre && (
        <PaginationBar
          activePage={currentGenre.page}
          itemsCountPerPage={1}
          onChange={handlePageChange}
          pageRangeDisplayed={10}
          totalItemsCount={currentGenre.total_pages}
          totalPage={currentGenre.total_pages}
        />
      )}
    </Container>
  );
};

export default SelectedGenre;
