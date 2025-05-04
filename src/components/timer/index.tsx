import React from 'react';
import './timer.sass';
import {
  getTimeLeft,
  renderFullTime,
  validateMinutesInput,
} from '../../utils/date';
import { FormattedMessage } from 'react-intl';
import messages from './messages';

interface TimerProps {
  className?: string;
  onStopPlayer: () => void;
}

function Timer({ className = '', onStopPlayer }: TimerProps) {
  const [timer, setTimer] = React.useState<{
    interval: number | null;
    startAt: Date | null;
    minutes: number | string;
    hours: number | string;
  }>({
    interval: null,
    startAt: null,
    minutes: 10,
    hours: 0,
  });

  React.useEffect(() => {
    return () => {
      if (timer.interval) {
        clearInterval(timer.interval);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleChangeTime =
    (type: string) => (event: React.FormEvent<HTMLInputElement>) => {
      setTimer({
        ...timer,
        minutes:
          type === 'm'
            ? validateMinutesInput(event.currentTarget.value)
            : timer.minutes,
        hours:
          type === 'h'
            ? validateMinutesInput(event.currentTarget.value)
            : timer.hours,
      });
    };

  const handleTimerReset = () => {
    if (timer.interval) {
      clearInterval(timer.interval);
    }
    setTimer({
      minutes: 10,
      hours: 0,
      startAt: null,
      interval: null,
    });
  };

  const handleStartTimer = () => {
    if (!timer.minutes && !timer.hours) {
      return;
    }
    const startAt = new Date();
    const interval = setInterval(() => {
      const timeLeft = getTimeLeft(
        startAt,
        String(timer.minutes),
        String(timer.hours)
      );
      if (timeLeft < 0) {
        onStopPlayer();
        setTimer({
          ...timer,
          startAt: null,
          interval: null,
        });
        clearInterval(interval);
      } else {
        setTimer((t) => ({ ...t })); // rerender every second
      }
    }, 1000);
    setTimer({
      ...timer,
      startAt,
      interval,
    });
  };

  const timeLeft = getTimeLeft(
    timer.startAt!,
    String(timer.minutes),
    String(timer.hours)
  );

  return (
    <div className={`timer ${className}`}>
      <h3 className="timer__title">
        <FormattedMessage {...messages.title} />
      </h3>
      {timer.interval && (
        <div className="timer__countdown">
          <h4 className="timer__countdown__text">{renderFullTime(timeLeft)}</h4>
        </div>
      )}
      {!timer.interval && (
        <div className="timer__form">
          <span className="timer__form__text">
            <FormattedMessage {...messages.hours} />
          </span>
          <input
            className="timer__form__input"
            value={timer.hours}
            onChange={handleChangeTime('h')}
          />
          <span className="timer__form__text">
            <FormattedMessage {...messages.minutes} />
          </span>
          <input
            className="timer__form__input"
            value={timer.minutes}
            onChange={handleChangeTime('m')}
          />
        </div>
      )}
      <div className="timer__buttons">
        <button className="timer__button" onClick={handleTimerReset}>
          <FormattedMessage {...messages.reset} />
        </button>
        <button className="timer__button" onClick={handleStartTimer}>
          <FormattedMessage {...messages.start} />
        </button>
      </div>
    </div>
  );
}

export default Timer;
