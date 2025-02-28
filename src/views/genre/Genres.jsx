import { Container, ProgressLoader } from "@app/components/common";
import { GenreCard } from "@app/components/main";
import { useDocumentTitle } from "@app/hooks";
import { fetchGenres } from "@app/redux/actions";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const Genres = () => {
  const { genres, isLoading } = useSelector((state) => ({
    genres: state.genre.genres,
    isLoading: state.misc.isLoading,
  }));
  const dispatch = useDispatch();

  useDocumentTitle("Genres | MOVIEVERSE");
  useEffect(() => {
    if (genres.length === 0) {
      dispatch(fetchGenres());
    }
  }, [genres, dispatch]);

  return (
    <Container>
      {isLoading && <ProgressLoader message="Loading Genres" />}
      {genres.length >= 1 && (
        <>
          <div className="header__title text-center">
            <br />
            <br />
            <h1>Genres</h1>
          </div>
          <div className="genre__wrapper">
            {genres.map((genre) => {
              return <GenreCard genre={genre} key={genre.id} />;
            })}
          </div>
        </>
      )}
    </Container>
  );
};

export default Genres;
