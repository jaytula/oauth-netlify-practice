import dayjs from "dayjs";
import React, { useState } from "react";
import { useHistory } from "react-router";
import { useAuth } from "../../providers/auth-provider";
import { useInterval } from "../../utils/helpers";
import classes from "./RefreshModal.module.css";

interface RefreshModalProps {
  enabled: boolean;
  exp: number;
  refresh: Function;
  logout: Function;
}

const RefreshModal: React.FC<RefreshModalProps> = ({
  enabled,
  exp,
  refresh,
  logout,
}) => {
  const [secondsLeft, setSecondsLeft] = useState(0);
  const history = useHistory();

  useInterval(() => {
    const expDate = dayjs.unix(exp);
    const updatedSecondsLeft = expDate.diff(dayjs(), "second");

    setSecondsLeft(updatedSecondsLeft);
  }, 1000);

  const onRefresh = () => {
    refresh();
  };

  const onLogout = () => {
    logout(() => {
      history.replace("/");
    });
  };

  return enabled && secondsLeft >= 1 && secondsLeft <= 90 ? (
    <div className={classes.RefreshModal}>
      <div className={classes.RefreshModalContent}>
        You will be logged out in: {secondsLeft} seconds
        <button onClick={onRefresh}>Refresh</button>
        <button onClick={onLogout}>Logout</button>
      </div>
    </div>
  ) : null;
};

export default RefreshModal;
