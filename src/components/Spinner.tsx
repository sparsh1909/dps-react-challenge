import React from 'react';

const Spinner: React.FC = () => (
  <div style={{
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    width: '100vw',
    position: 'absolute',
    top: 0,
    left: 0,
    backgroundColor: '#f0f8ff',
    zIndex: 1000
  }}>
    <div style={{ textAlign: 'center' }}>
      <div style={{
        border: '4px solid #f3f3f3',
        borderRadius: '50%',
        borderTop: '4px solid #007bff',
        width: '40px',
        height: '40px',
        animation: 'spin 1s linear infinite',
        margin: '0 auto'
      }}></div>
      <p style={{ marginTop: '10px', fontSize: '16px', color: '#007bff' }}>Loading...</p>
      <style>
        {`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}
      </style>
    </div>
  </div>
);

export default Spinner;
