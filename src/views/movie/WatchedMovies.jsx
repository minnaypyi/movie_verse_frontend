import { Container, Pagination } from '@app/components/common';
import CustomPagination from '@app/components/common/Pagination/Pagination';
import { MovieList } from '@app/components/main/Movies'; // Named import
import { numberWithCommas } from '@app/helpers/helperFunctions';
import { useDocumentTitle } from '@app/hooks';
import useWatched from '@app/hooks/useWatched';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom'; // Import useHistory

const TMDB_API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const TMDB_BASE_URL = 'https://api.themoviedb.org/3/movie';

const token = import.meta.env.VITE_TMDB_TOKEN;

const WatchedMovies = () => {
    const { watchedMovies } = useWatched();
    const [movieData, setMovieData] = useState([]);
    const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const itemsPerPage = 10;

  const history = useHistory(); // Initialize useHistory hook

  useDocumentTitle('Watched Movies | MOVIEVERSE');

    // Check if user is logged in, if not, redirect to login page
    useEffect(() => {
      const authToken = localStorage.getItem('authToken'); // Check if token exists in localStorage
      if (!authToken) {
          history.push('/login'); // Redirect to login if not logged in
      }
  }, [history]);

  useEffect(() => {
    if (watchedMovies.length === 0) {
        setMovieData([]);
        setLoading(false);
        return;
      }
      const fetchMovies = async () => {
        setLoading(true);
        try {
          const moviePromises = watchedMovies.map((movieId) =>
            axios.get(`${TMDB_BASE_URL}/${movieId}`, 
                {
                    headers: { Authorization: `Bearer ${token}` },
                  },{
              params: { api_key: TMDB_API_KEY },
            })
          );
  
          const movieResponses = await Promise.all(moviePromises);
          const movies = movieResponses.map((res) => res.data);
          setMovieData(movies);
        } catch (error) {
            console.error('Error fetching movie details:', error);
          } finally {
            setLoading(false);
          }
        };
    
        fetchMovies();
      
  }, [watchedMovies]);

  // Paginate watched movies
  const displayedMovies = movieData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <Container>
      <div className="movie__header">
        <div className="movie__header-title">
          <h1>Watched Movies</h1>
          <h3>{numberWithCommas(movieData.length)} Movies</h3>
        </div>
      </div>
      {loading ? (
        <p>Loading movies...</p>
      ) : movieData.length === 0 ? (
        <p>No watched movies found. Add some watched movies to get started!</p> // Display a message if no favorite movies
      ) : (
        <>
      <MovieList movies={displayedMovies} templateCount={10} />
      {movieData.length > itemsPerPage && (
        <CustomPagination
          activePage={currentPage}
          itemsCountPerPage={1}
          onChange={handlePageChange}
          pageRangeDisplayed={10}
          totalItemsCount={Math.ceil(movieData.length / itemsPerPage)}
          totalPage={Math.ceil(movieData.length / itemsPerPage)}
          infiniteScroll={true}
        />
      )}
      </>
      )}
    </Container>
  );
};

export default WatchedMovies;
