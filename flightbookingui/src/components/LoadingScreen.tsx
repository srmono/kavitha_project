import React from 'react';

const LoadingScreen = () => {
  return (
    <div className="container d-flex align-items-center">
      <div className="spinner-border text-primary" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>
  );
};

export default LoadingScreen;
