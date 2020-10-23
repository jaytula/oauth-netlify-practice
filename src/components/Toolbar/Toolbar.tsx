import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../services/auth";
import classes from './Toolbar.module.css';

const Toolbar: React.FC = ({ children }) => {
  const { getStoredUser } = useAuth();

  const user = getStoredUser();

  return (
    <div className={classes.Toolbar}>
      <div>
        <Link to="/lwa">LWA</Link>{" "}
        <Link to="/netlify-oauth">Netlify OAuth</Link>{" "}
        <Link to="/profile">Profile</Link>
      </div>
      <div>
        {JSON.stringify(user, null, 2)}
      </div>
    </div>
  );
};

export default Toolbar;
