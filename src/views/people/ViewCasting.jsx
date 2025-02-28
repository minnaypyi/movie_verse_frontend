import { MovieList } from "@app/components/main";
import { useDocumentTitle } from "@app/hooks";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";

const Casting = ({ history }) => {
  const { actor, casting } = useSelector((state) => ({
    actor: state.people.current.actor,
    casting: state.people.current.casting,
  }));

  useDocumentTitle("Castings | MOVIEVERSE");
  useEffect(() => {
    if (!actor) {
      history.goBack();
    }
  }, [actor, history]);

  return !actor ? null : (
    <>
      <div className="posters__banner">
        <img src="/background.jpg" alt="" />
        <div className="posters__banner-content">
          <h1>{actor.name}</h1>
          <button className="button--back" onClick={history.goBack}>
            Back
          </button>
        </div>
      </div>
      <div className="container__wrapper">
        <div className="movie__header">
          <div className="movie__header-title">
            <h1>Casted Movies</h1>
            <h3>{casting.length} Movies</h3>
          </div>
        </div>
        <MovieList movies={casting} />
      </div>
    </>
  );
};

export default Casting;
