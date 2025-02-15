/* eslint-disable react/jsx-boolean-value */
import { ThemeToggler, TopProgressLoader } from '@app/components/common';
import * as route from '@app/constants/routes';
import React, { useEffect, useState } from 'react';
import { Link, NavLink, withRouter, useHistory, useLocation } from 'react-router-dom';
import Searchbar from './Searchbar';

const Navigation = () => {
  const [isOpenNavigation, setOpenNavigation] = useState(false);
  const [isOpenSearchForMobile, setOpenSearchMobile] = useState(false);
  const [user, setUser] = useState(null); // Store user info
  const [dropdownOpen, setDropdownOpen] = useState(false); // Dropdown toggle
  const history = useHistory();
  const location = useLocation();

  useEffect(() => {
    if (window.screen.width > 768) {
      window.addEventListener('scroll', scrollHandler);
    }
    return () => window.removeEventListener('scroll', scrollHandler);
  }, []);

  useEffect(() => {
    // Get user from localStorage
    // const storedUser = JSON.parse(localStorage.getItem('userData'));
    const storedUser = localStorage.getItem('username');
    if (storedUser) {
      setUser(storedUser);
    }
  }, []);

  const onNavigationToggle = () => {
    document.body.classList.toggle('is-navigation-open');
    document.body.classList.remove('is-search-open');
    setOpenNavigation(!isOpenNavigation);
  };

  const onSearchToggle = () => {
    document.body.classList.toggle('is-search-open');
    document.body.classList.remove('is-navigation-open');
    setOpenSearchMobile(true);
    setOpenNavigation(false);
  };

  const onClickLink = (e) => {
    if (e.target.nodeName === 'A') {
      document.body.classList.remove('is-navigation-open');
      setOpenNavigation(false);
      setOpenSearchMobile(false);
      window.scrollTo(0, 0);
    }
  };

  const closeSearchForMobile = () => {
    setOpenSearchMobile(false);
  };

  const scrollHandler = () => {
    if (window.pageYOffset > 100) {
      document.body.classList.add('is-scrolled');
    } else {
      document.body.classList.remove('is-scrolled');
    }
  };

  
  const handleLogout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('username');
    setUser(null);
    if (
      location.pathname === route.FAVORITE_MOVIES ||
      location.pathname === route.WATCHED_MOVIES ||
      location.pathname === route.RECOMMENDED_MOVIES
    ) {
      history.push(route.HOME); // Redirect to home if on specific page
    } else {
      window.location.reload(); // Refresh on other pages
    }
  };

  return (
    <>
      <TopProgressLoader />
      <div className="navigation" onClick={onClickLink}>
        <div className="navigation__wrapper">
          <button className="navigation__toggle" onClick={onNavigationToggle}>
            <i className={`fa fa-${isOpenNavigation ? 'times' : 'bars'}`} />
          </button>
          <div className="navigation__logo">
            <Link to={route.HOME}>
              <img src="/logo-full.png" alt="" />
            </Link>
          </div>
          <div className="navigation__menu-wrapper">
            <div className="navigation__menu">
              <ThemeToggler toggleId="themeSwitchNav" />
              <NavLink
                activeClassName="navigation__active"
                className="navigation__link"
                exact
                strict
                to={route.HOME}
              >
                Home
              </NavLink>
              <NavLink
                activeClassName="navigation__active"
                className="navigation__link"
                exact
                strict
                to={route.TRENDING}
              >
                Trending
              </NavLink>
              <div className="navigation__dropdown">
                <NavLink
                  activeClassName="navigation__active"
                  className="navigation__link navigation__dropdown-item"
                  exact
                  strict
                  to={route.DISCOVER}
                >
                  Discover
                </NavLink>
                <div className="navigation__dropdown-wrapper">
                  <Link to={route.POPULAR}>Popular</Link>
                  <Link to={route.UPCOMING}>Upcoming</Link>
                  <Link to={route.TOP_RATED}>Top Rated</Link>
                </div>
              </div>
              <NavLink
                activeClassName="navigation__active"
                className="navigation__link desktop-hide"
                exact
                strict
                to={route.POPULAR}
              >
                Popular
              </NavLink>
              <NavLink
                activeClassName="navigation__active"
                className="navigation__link desktop-hide"
                exact
                strict
                to={route.TOP_RATED}
              >
                Top Rated
              </NavLink>
              <NavLink
                activeClassName="navigation__active"
                className="navigation__link desktop-hide"
                exact
                strict
                to={route.UPCOMING}
              >
                Upcoming
              </NavLink>
              <NavLink
                activeClassName="navigation__active"
                className="navigation__link"
                exact
                strict
                to={route.PEOPLE}
              >
                People
              </NavLink>
              {user && (
                <>
                  <NavLink
                    activeClassName="navigation__active"
                    className="navigation__link"
                    exact
                    strict
                    to={route.FAVORITE_MOVIES}
                  >
                    Favorites
                  </NavLink>
                  <NavLink
                    activeClassName="navigation__active"
                    className="navigation__link"
                    exact
                    strict
                    to={route.WATCHED_MOVIES}
                  >
                    Watched
                  </NavLink>
                </>
              )}
            </div>
            <Searchbar closeSearchForMobile={closeSearchForMobile} />
          </div>
          <button
            className="search__toggle button--icon"
            onClick={onSearchToggle}
          >
            <i className={`fa fa-${isOpenSearchForMobile ? 'times' : 'search'}`} />
          </button>
          {/* User Dropdown OR Log In/Register */}
          <div className="navigation__active">
            {user ? (
              <div className="relative">
                <button className="navigation__link" onClick={() => setDropdownOpen(!dropdownOpen)}>
                  {user} <i className="fa fa-caret-down"></i>
                </button>
                {dropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg z-50">
                    <button
                      onClick={() => {
                        setDropdownOpen(false); // Close the dropdown
                        history.push(route.PROFILE); // Navigate to profile page
                        }} className="block px-4 py-2 text-gray-800 hover:bg-gray-100">
                      Profile
                      </button>
                    <button onClick={handleLogout} className="block w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-100">
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link to={route.LOGIN} className="navigation__link">
                Log In / Register
              </Link>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default withRouter(Navigation);
