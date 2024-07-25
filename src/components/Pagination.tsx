import React from 'react';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, onPageChange }) => (
  <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
    <button
      onClick={() => onPageChange(currentPage - 1)}
      disabled={currentPage === 1}
      style={{
        padding: '10px 20px',
        margin: '0 5px',
        backgroundColor: '#007bff',
        color: 'white',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
        opacity: currentPage === 1 ? 0.5 : 1,
      }}
    >
      Previous
    </button>
    <span style={{ padding: '10px 20px', margin: '0 5px', fontSize: '16px' }}>
      Page {currentPage} of {totalPages}
    </span>
    <button
      onClick={() => onPageChange(currentPage + 1)}
      disabled={currentPage === totalPages}
      style={{
        padding: '10px 20px',
        margin: '0 5px',
        backgroundColor: '#007bff',
        color: 'white',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
        opacity: currentPage === totalPages ? 0.5 : 1,
      }}
    >
      Next
    </button>
  </div>
);

export default Pagination;
