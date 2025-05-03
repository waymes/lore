import moment from 'moment';

export const getTimeLeft = (startAt: Date, minutes: string, hours: string) => {
  const checkedMinutes = minutes || '0';
  const checkedHours = hours || '0';
  const totalMinutes =
    parseInt(checkedHours, 10) * 60 + parseInt(checkedMinutes, 10);
  const diff = moment().diff(startAt);
  const totalMilliseconds = totalMinutes * 60 * 1000;
  return totalMilliseconds - diff;
};

export const validateMinutesInput = (value?: number | string) => {
  const number = parseInt(value as string, 10);
  if (!number) return '';
  if (number >= 60) {
    return 59;
  } else if (number < 0) {
    return 0;
  }
  return number;
};

const timeWithZero = (time: number) => {
  if (time < 10) {
    return `0${time}`;
  }
  return time;
};

export const renderFullTime = (milliseconds: number) => {
  const duration = moment.duration(milliseconds, 'milliseconds');
  let hours = timeWithZero(duration.hours());
  if (duration.days() > 0) {
    hours = duration.hours() + duration.days() * 24;
  }
  const minutes = timeWithZero(duration.minutes());
  const seconds = timeWithZero(duration.seconds());

  return `${hours}:${minutes}:${seconds}`;
};
