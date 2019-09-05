import React from 'react';
import Spinner from 'react-bootstrap'
const LoadingSpinner = () => (
  
    <div className="text-center" style={{marginTop: "15%"}}>
  <div className="spinner-border" role="status">
    <span className="sr-only">Loading...</span>
  </div>
</div>
);

export default LoadingSpinner;