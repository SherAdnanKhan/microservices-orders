import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <div className="bottom">
      <Link to="/dashboard/exhibition/new">
        <i className="fas fa-plus" />
      </Link>
    </div>
  );
};

export default Footer;
