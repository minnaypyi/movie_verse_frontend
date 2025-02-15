import {
  Footer,
  Navigation,
  ScrollTop,
  ThemeToggler,
} from "@app/components/common";
import withProgress from "@app/components/hoc/withProgress";
import * as route from "@app/constants/routes";
import * as view from "@app/views";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  useLocation,
  useHistory,
} from "react-router-dom";
import { Slide, ToastContainer } from "react-toastify";
import React, { useEffect, useState } from "react";

const backendUrl = import.meta.env.VITE_BACKEND_URL;
const MainContent = () => {
  const location = useLocation(); // Get current route
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const history = useHistory();

  useEffect(() => {
    const verifyToken = async () => {
      const token = localStorage.getItem("authToken");
      const username = localStorage.getItem("username");

      if (!token || !username) {
        //console.log("No token found. Redirecting to login.");
        //history.push("/login");
        return;
      }

      try {
        const response = await fetch(
          `http://${backendUrl}:8080/api/users/verify-token`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({ username }),
          }
        );

        if (!response.ok) {
          console.log("Token is invalid. Redirecting to login.");
          localStorage.removeItem("authToken");
          localStorage.removeItem("username");
          //history.push("/login");
        } else {
          console.log("Token is valid.");
          setIsAuthenticated(true);
        }
      } catch (error) {
        console.error("Error verifying token:", error);
        //history.push("/login");
      }
    };
    verifyToken();
  }, [history]); // Runs when `navigate` changes (on page load)

  // if (!isAuthenticated) {
  //   return <div>Loading...</div>; // Show loading screen while checking authentication
  // }

  return (
    <main id="main" key={location.pathname}>
      {" "}
      {/* 🔥 Key forces re-render on route change */}
      <Switch>
        <Route exact path={route.HOME} component={withProgress(view.Home)} />
        <Route
          exact
          path={route.DISCOVER}
          component={withProgress(view.DiscoverMovies)}
        />
        <Route
          exact
          path={route.TRENDING}
          component={withProgress(view.TrendingMovies)}
        />
        <Route exact path={route.TV} component={withProgress(view.TvShows)} />
        <Route
          exact
          path={route.TOP_RATED}
          component={withProgress(view.TopRatedMovies)}
        />
        <Route
          exact
          path={route.UPCOMING}
          component={withProgress(view.UpcomingMovies)}
        />
        <Route
          exact
          path={route.POPULAR}
          component={withProgress(view.PopularMovies)}
        />
        <Route
          exact
          path={route.VIEW_MOVIE}
          component={withProgress(view.ViewMovie)}
        />
        <Route
          exact
          path={route.PEOPLE}
          component={withProgress(view.People)}
        />
        <Route exact path={route.FAVORITES} component={view.Favorites} />
        <Route
          exact
          path={route.REGISTER}
          component={withProgress(view.Register)}
        />
        <Route exact path={route.LOGIN} component={withProgress(view.Login)} />
        <Route
          exact
          path={route.SELECTGENRE}
          component={withProgress(view.SelectGenre)}
        />
        <Route exact path={route.NETWORK_ERROR} component={view.NetworkError} />
        <Route exact path={route.ERROR} component={view.PageError} />
        <Route
          exact
          path={route.SEARCH}
          component={withProgress(view.Search)}
        />
        <Route
          exact
          path={route.VIEW_PEOPLE}
          component={withProgress(view.ViewPerson)}
        />
        <Route
          exact
          path={route.VIEW_GENRE}
          component={withProgress(view.SelectedGenre)}
        />
        <Route
          exact
          path={route.VIEW_MOVIE_POSTER}
          component={withProgress(view.MoviePosters)}
        />
        <Route
          exact
          path={route.VIEW_MOVIE_CASTS}
          component={withProgress(view.MovieCasts)}
        />
        <Route
          exact
          path={route.VIEW_PEOPLE_PROFILE}
          component={withProgress(view.Pictures)}
        />
        <Route
          exact
          path={route.FAVORITE_MOVIES}
          component={withProgress(view.FavoriteMovies)}
        />
        <Route
          exact
          path={route.WATCHED_MOVIES}
          component={withProgress(view.WatchedMovies)}
        />
        <Route
          exact
          path={route.RECOMMENDED_MOVIES}
          component={withProgress(view.RecommendedMovies)}
        />
        <Route
          exact
          path={route.PROFILE}
          component={withProgress(view.UserProfile)}
        />
        <Route
          exact
          path={route.FORGOTPASSWORD}
          component={withProgress(view.ForgotPassword)}
        />
        <Route component={view.PageNotFound} />
      </Switch>
    </main>
  );
};

const AppRouter = () => (
  <Router>
    <>
      <ToastContainer
        autoClose={3000}
        position="top-right"
        transition={Slide}
      />
      <Navigation />
      <ScrollTop />
      <div className="theme__toggler-desktop">
        <ThemeToggler />
      </div>
      <MainContent /> {/* 🔥 Extracted to use `useLocation()` */}
      <Footer />
    </>
  </Router>
);

export default AppRouter;
