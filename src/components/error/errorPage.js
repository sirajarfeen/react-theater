import React from 'react';
import { Link } from 'react-router-dom';
import './errorPage.scss';

const ErrorPgae = () => {
  return (
    <div className="error-page">
      <h1 className="error-header">Oooppsss!</h1>
      <p className=" error-msg">Something went wrong.</p>
      <Link to={'/'}>
        <i className="icon-home"></i> Go back to home page.
      </Link>
    </div>
  );
};

export default ErrorPgae;
