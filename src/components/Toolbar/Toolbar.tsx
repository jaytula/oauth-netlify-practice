import React from "react";
import dayjs from "dayjs";

import { Link, useHistory } from "react-router-dom";
import { useAuth } from "../../services/auth";
import classes from "./Toolbar.module.css";

const Toolbar: React.FC = ({ children }) => {
  const { user, logout } = useAuth();
  const history = useHistory();

  const onLogout = () => {
    logout(() => {
      history.replace("/");
    });
  };

  const iat = dayjs.unix(Number(user.iat)); 
  const exp = dayjs.unix(Number(user.exp));
  const now = dayjs();

  return (
    <div className={classes.Toolbar}>
      <div>
        <Link to="/lwa">LWA</Link>{" "}
        <Link to="/netlify-oauth">Netlify OAuth</Link>{" "}
        <Link to="/profile">Profile</Link>
      </div>
      <div>
        {user.email ? (
          <div>
            {user.email} | {user.userId} |{" "}
            {iat.format("YYYY-MM-DDTHH:mm:ssZZ")} |{" "}
            {exp.diff(now, 'second')} |{" "}
            <button onClick={onLogout}>Logout</button>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default Toolbar;
