import { Container, Pagination } from '@app/components/common';
import { PeopleList } from '@app/components/main';
import { numberWithCommas } from '@app/helpers/helperFunctions';
import { useDocumentTitle, usePageSaver } from '@app/hooks';
import { fetchPeople } from '@app/redux/actions';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const People = () => {
  const people = useSelector(state => state.people.people);
  const { currentPage, setCurrentPage } = usePageSaver();
  const dispatch = useDispatch();

  useDocumentTitle('Discover People | MOVX');
  useEffect(() => {
    if (!people) {
      dispatch(fetchPeople(currentPage));
    }
  }, [dispatch, people, currentPage]);

  const handlePageChange = (page) => {
    if (people?.page !== page) {
      dispatch(fetchPeople(page));
      setCurrentPage(page);
    }
  };

  return (
    <Container>
      <div className="movie__header">
        <div className="movie__header-title">
          <h1>Popular People</h1>
          <h3>{numberWithCommas(people?.total_results || 0)} People</h3>
        </div>
      </div>
      <PeopleList
        people={people?.results || []}
        templateCount={10}
      />
      {people && (
        <Pagination
          activePage={people.page}
          itemsCountPerPage={1}
          onChange={handlePageChange}
          pageRangeDisplayed={10}
          totalItemsCount={people.total_pages}
          totalPage={people.total_pages}
        />
      )}
    </Container>
  );
};

export default People;
