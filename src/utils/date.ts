import moment from 'moment';

export const getTimeLeft = (startAt: Date, totalMinutes: number) => {
  const diff = moment().diff(startAt);
  const totalMilliseconds = totalMinutes * 60 * 1000;
  return totalMilliseconds - diff;
};

const timeWithZero = (time: number) => {
  if (time < 10) {
    return `0${time}`;
  }
  return time;
};

export const renderFullTime = (milliseconds: number) => {
  const duration = moment.duration(milliseconds, 'milliseconds');
  const hours = timeWithZero(duration.hours());
  const minutes = timeWithZero(duration.minutes());
  const seconds = timeWithZero(duration.seconds());

  return `${hours}:${minutes}:${seconds}`;
};
