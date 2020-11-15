import React, { Fragment, useState } from "react";
import dayjs from "dayjs";

import { Link, useHistory } from "react-router-dom";
import { useAuth } from "../../providers/auth-provider";
import classes from "./Toolbar.module.css";
import { useInterval } from "../../utils/helpers";

const Toolbar: React.FC = ({ children }) => {
  const { user, logout, refresh } = useAuth();
  const [timeLeft, setTimeLeft] = useState(0);
  const history = useHistory();

  const onLogout = () => {
    logout(() => {
      history.replace("/");
    });
  };

  const onRefresh = () => {
    refresh();
  };

  const iat = dayjs.unix(Number(user.iat));

  useInterval(() => {
    const exp = dayjs.unix(Number(user.exp));

    const updatedTimeLeft = exp.diff(dayjs(), "second");

    setTimeLeft(updatedTimeLeft);
    if (updatedTimeLeft <= 0 && user.email) {
      logout(() => {
        history.replace("/");
      });
    }
  }, 1000);

  return (
    <div className={classes.Toolbar}>
      <div>
        {!user.email && (
          <Fragment>
            <Link to="/lwa">LWA</Link>{" "}
            <Link to="/netlify-oauth">Netlify OAuth</Link>{" "}
          </Fragment>
        )}
        {user.email && <Link to="/profile">Profile</Link>}
      </div>
      <div>
        {user.email ? (
          <div>
            {user.email} | {user.userId} | {iat.format("YYYY-MM-DDTHH:mm:ssZZ")}{" "}
            | {timeLeft} | <button onClick={onRefresh}>Refresh</button> |{" "}
            <button onClick={onLogout}>Logout</button>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default Toolbar;
