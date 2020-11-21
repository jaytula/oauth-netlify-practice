import React, { useState } from "react";
import dayjs from "dayjs";
import { useInterval } from "@groundearth0/auth-utils";
import classes from "./RefreshModal.module.css";

interface RefreshModalProps {
  enabled: boolean;
  exp: number;
  refresh: () => void;
  onLogout: () => void;
  secondsRemaining?: number;
}

const RefreshModal: React.FC<RefreshModalProps> = ({
  enabled,
  exp,
  refresh,
  onLogout,
  secondsRemaining = 90,
}) => {
  const [secondsLeft, setSecondsLeft] = useState(0);

  useInterval(() => {
    const expDate = dayjs.unix(exp);
    const updatedSecondsLeft = expDate.diff(dayjs(), "second");
    setSecondsLeft(updatedSecondsLeft);
  }, 1000);

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
