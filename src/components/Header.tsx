import React from 'react';

const Header: React.FC = () => (
  <header style={{
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#007bff',
    color: 'white',
    padding: '20px',
    borderRadius: '8px',
    marginBottom: '20px',
    boxShadow: '0 8px 16px rgba(0,0,0,0.2)'
  }}>
    <h1 style={{ margin: 0, fontSize: '24px' }}>Customer Relationship Management</h1>
    <img
      src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQiEKZQ9Vdz9ul02y0LINkg7OcLWwNV0kkbXQ&s"
      alt="Logo"
      style={{
        borderRadius: '10%',
        width: '50px',
        height: '50px'
      }}
    />
  </header>
);

export default Header;
