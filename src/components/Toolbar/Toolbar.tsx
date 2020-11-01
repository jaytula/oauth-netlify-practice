import React from "react";
import * as dayjs from "dayjs";
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
            {dayjs.unix(Number(user.iat)).format("YYYY-MM-DDTHH:mm:ssZZ")} |{" "}
            {dayjs.unix(Number(user.exp)).format("YYYY-MM-DDTHH:mm:ssZZ")} |{" "}
            <button onClick={onLogout}>Logout</button>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default Toolbar;
