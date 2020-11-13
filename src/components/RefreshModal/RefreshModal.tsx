import dayjs from 'dayjs';
import React, { useState } from 'react';
import { useAuth } from '../../providers/auth-provider';
import { useInterval } from '../../utils/helpers';
import classes from './RefreshModal.module.css';

const RefreshModal = () => {
  const [secondsLeft, setSecondsLeft] = useState(0);
  const { user, refresh } = useAuth();

  useInterval(() => {
    const exp = dayjs.unix(user.exp);
    const updatedSecondsLeft = exp.diff(dayjs(), 'second');
    setSecondsLeft(updatedSecondsLeft);
  }, 1000);

  const onRefresh = () => {
    refresh();
  };

  return user.email && secondsLeft >= 1 && secondsLeft <= 570 ? (
    <div className={classes.RefreshModal}>
      <div className={classes.RefreshModalContent}>
        You will be logged out in: {secondsLeft} seconds
        <button onClick={onRefresh}>Refresh</button>
      </div>
    </div>
  ) : null;
};

export default RefreshModal;
