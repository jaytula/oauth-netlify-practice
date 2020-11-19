import { useInterval } from "@groundearth0/auth-utils";
import dayjs from "dayjs";
import React, { useState } from "react";
import { useHistory } from "react-router";
import classes from "./RefreshModal.module.css";

interface RefreshModalProps {
  enabled: boolean;
  exp: number;
  refresh: () => {};
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

  const onLogout = () => {
    logout(() => {
      history.replace("/");
    });
  };

  return enabled && secondsLeft >= 1 && secondsLeft <= 90 ? (
    <div className={classes.RefreshModal}>
      <div className={classes.RefreshModalContent}>
        You will be logged out in: {secondsLeft} seconds
        <button onClick={refresh}>Refresh</button>
        <button onClick={onLogout}>Logout</button>
      </div>
    </div>
  ) : null;
};

export default RefreshModal;
