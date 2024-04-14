import React from 'react';
import { Button } from 'react-bootstrap';

const Pagination = ({ pages, currentPage, changePage }) => {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
      {pages.map((page, index) => (
        <Button
          key={`pageButton${index}`}
          variant={page === currentPage ? 'primary' : 'outline-primary'}
          onClick={() => changePage(page)}
          style={{ margin: '0 5px', padding: '5px 10px' }}

        >
          {page}
        </Button>
      ))}
    </div>
  );
};

export default Pagination;
