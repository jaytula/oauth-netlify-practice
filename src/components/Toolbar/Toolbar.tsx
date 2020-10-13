import React from "react";
import { Link } from "react-router-dom";

const Toolbar: React.FC = ({ children }) => {
  return <div>
    <Link to="/lwa">LWA</Link>{' '}
    <Link to="/netlify-oauth">Netlify OAuth</Link>{' '}
    <Link to="/profile">Profile</Link>
  </div>;
};

export default Toolbar;
