import moment from 'moment';

export const getDateFormatted = dateString => {
  const date = new Date(dateString);
  const dateFormatted = `${moment(date).format('DD MM YYYY')} at ${moment(
    date,
  ).format('HH:mm')}`;
  return dateFormatted;
};
