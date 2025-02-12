import React, { useEffect, useState, useCallback } from 'react';
import Pagination from 'react-js-pagination';

const CustomPagination = ({
  activePage,
  totalPage,
  onChange,
  itemsCountPerPage,
  pageRangeDisplayed = 10,
  totalItemsCount,
  infiniteScroll = false
}) => {
  const [isMobile, setMobile] = useState(false);

  useEffect(() => {
    if (window.screen.width <= 420) {
      setMobile(true);
    }
  }, []);

  const handleInfiniteScroll = useCallback(() => {
    const scrollPosition = window.innerHeight + window.scrollY;
    const documentHeight = document.documentElement.scrollHeight;

    if (scrollPosition >= documentHeight - 100) {
      if (activePage < totalPage) {
        onChange(activePage + 1);
      }
    }
  }, [activePage, totalPage, onChange]);

  useEffect(() => {
    if (infiniteScroll) {
      window.addEventListener('scroll', handleInfiniteScroll);
      return () => {
        window.removeEventListener('scroll', handleInfiniteScroll);
      };
    }
  }, [infiniteScroll, handleInfiniteScroll]);

  if (!infiniteScroll && (!!totalPage && totalPage > 1)) {
    return (
      <div className="pagination__wrapper">
        <p>Page {activePage}/{totalPage > 1000 ? 1000 : totalPage}</p>
        <Pagination
          activePage={activePage}
          disabledClass="page--disabled"
          firstPageText="First"
          hideNavigation={totalPage <= 1}
          itemsCountPerPage={itemsCountPerPage}
          lastPageText="Last"
          nextPageText="Next"
          onChange={onChange}
          pageRangeDisplayed={isMobile ? 3 : pageRangeDisplayed}
          prevPageText="Prev"
          totalItemsCount={totalItemsCount > 1000 ? 1000 : totalItemsCount}
        />
      </div>
    );
  }

  return null;
};

export default CustomPagination;
