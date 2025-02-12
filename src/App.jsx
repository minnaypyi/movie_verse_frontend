import { Footer, Navigation, ScrollTop, ThemeToggler } from '@app/components/common';
import withProgress from '@app/components/hoc/withProgress';
import * as route from '@app/constants/routes';
import * as view from '@app/views';
import React from 'react';
import { BrowserRouter as Router, Route, Switch, useLocation } from 'react-router-dom';
import { Slide, ToastContainer } from 'react-toastify';

const MainContent = () => {
  const location = useLocation(); // Get current route

  return (
    <main id="main" key={location.pathname}> {/* 🔥 Key forces re-render on route change */}
      <Switch>
        <Route exact path={route.HOME} component={withProgress(view.Home)} />
        <Route exact path={route.DISCOVER} component={withProgress(view.DiscoverMovies)} />
        <Route exact path={route.TRENDING} component={withProgress(view.TrendingMovies)} />
        <Route exact path={route.TV} component={withProgress(view.TvShows)} />
        <Route exact path={route.TOP_RATED} component={withProgress(view.TopRatedMovies)} />
        <Route exact path={route.UPCOMING} component={withProgress(view.UpcomingMovies)} />
        <Route exact path={route.POPULAR} component={withProgress(view.PopularMovies)} />
        <Route exact path={route.VIEW_MOVIE} component={withProgress(view.ViewMovie)} />
        <Route exact path={route.PEOPLE} component={withProgress(view.People)} />
        <Route exact path={route.FAVORITES} component={view.Favorites} />
        <Route exact path={route.REGISTER} component={withProgress(view.Register)} />
        <Route exact path={route.LOGIN} component={withProgress(view.Login)} />
        <Route exact path={route.SELECTGENRE} component={withProgress(view.SelectGenre)} />
        <Route exact path={route.NETWORK_ERROR} component={view.NetworkError} />
        <Route exact path={route.ERROR} component={view.PageError} />
        <Route exact path={route.SEARCH} component={withProgress(view.Search)} />
        <Route exact path={route.VIEW_PEOPLE} component={withProgress(view.ViewPerson)} />
        <Route exact path={route.VIEW_GENRE} component={withProgress(view.SelectedGenre)}/>
        <Route component={view.PageNotFound} />
      </Switch>
    </main>
  );
};

const AppRouter = () => (
  <Router>
    <>
      <ToastContainer autoClose={3000} position="top-right" transition={Slide} />
      <Navigation />
      <ScrollTop />
      <div className="theme__toggler-desktop"><ThemeToggler /></div>
      <MainContent /> {/* 🔥 Extracted to use `useLocation()` */}
      <Footer />
    </>
  </Router>
);

export default AppRouter;
