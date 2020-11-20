import React, { useState } from "react";
import dayjs from "dayjs";
import { useHistory } from "react-router-dom";
import { useInterval } from "@groundearth0/auth-utils";
import classes from "./RefreshModal.module.css";

interface RefreshModalProps {
  enabled: boolean;
  exp: number;
  refresh: () => void;
  logout: Function;
  secondsRemaining?: number;
}

const RefreshModal: React.FC<RefreshModalProps> = ({
  enabled,
  exp,
  refresh,
  logout,
  secondsRemaining = 90,
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

  return enabled && secondsLeft >= 1 && secondsLeft <= secondsRemaining ? (
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
