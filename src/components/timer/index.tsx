import React from 'react';
import moment from 'moment';
import './timer.sass';
import { getTimeLeft, renderFullTime } from '../../utils/date';

interface TimerProps {
  className?: string;
  onStopPlayer: () => void;
}

function Timer({ className = '', onStopPlayer }: TimerProps) {
  const [timer, setTimer] = React.useState<{
    interval: number | null;
    startAt: Date | null;
    time: number;
  }>({
    time: 10, // minutes
    startAt: null,
    interval: null,
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
      const value = parseInt(event.currentTarget.value, 10);
      const currentDuration = moment.duration(timer.time, 'minutes');
      const newTime = moment.duration({
        minutes: type === 'm' ? value : currentDuration.minutes(),
        hours: type === 'h' ? value : currentDuration.hours(),
      });
      setTimer({
        ...timer,
        time: newTime.asMinutes(),
      });
    };

  const handleTimerReset = () => {
    if (timer.interval) {
      clearInterval(timer.interval);
    }
    setTimer({
      time: 10,
      startAt: null,
      interval: null,
    });
  };

  const handleStartTimer = () => {
    const startAt = new Date();
    const interval = setInterval(() => {
      const timeLeft = getTimeLeft(startAt, timer.time);
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

  const currentFormDuration = moment.duration(timer.time, 'minutes');
  const timeLeft = getTimeLeft(timer.startAt!, timer.time);

  return (
    <div className={`timer ${className}`}>
      <h3 className="timer__title">Will stop playing after:</h3>
      {timer.interval && (
        <div className="timer__countdown">
          <h4 className="timer__countdown__text">{renderFullTime(timeLeft)}</h4>
        </div>
      )}
      {!timer.interval && (
        <div className="timer__form">
          <span className="timer__form__text">Hours: </span>
          <input
            className="timer__form__input"
            type="number"
            value={currentFormDuration.hours()}
            onChange={handleChangeTime('h')}
          />
          <span className="timer__form__text">minutes: </span>
          <input
            className="timer__form__input"
            type="number"
            value={currentFormDuration.minutes()}
            onChange={handleChangeTime('m')}
          />
        </div>
      )}
      <div className="timer__buttons">
        <button className="timer__button" onClick={handleTimerReset}>
          Reset
        </button>
        <button className="timer__button" onClick={handleStartTimer}>
          Start
        </button>
      </div>
    </div>
  );
}

export default Timer;
