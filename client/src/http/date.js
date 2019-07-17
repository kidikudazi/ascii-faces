export function dateTimeFormatter(dateSting) {
  const date = new Date(dateSting);
  const now = Date.now();
  const moment = Math.round((now - date) / 1000);

  const mins = 60;
  const hr = mins * 60;
  const day = hr * 24;
  const week = day * 7;

  let formatDateTime;

  if (moment < 0) {
    formatDateTime = 'comming soon';
  } else if (moment < 30) {
    formatDateTime = 'just now';
  } else if (moment < mins) {
    formatDateTime = `${moment} seconds ago`;
  } else if (moment < 2 * mins) {
    formatDateTime = 'a minute ago';
  } else if (moment < hr) {
    formatDateTime = `${Math.floor(moment / mins)} minutes ago`;
  } else if (Math.floor(moment / hr) === 1) {
    formatDateTime = '1 hour ago';
  } else if (moment < day) {
    formatDateTime = `${Math.floor(moment / hr)} hours ago`;
  } else if (moment < day * 2) {
    formatDateTime = 'yesterday';
  } else if (moment < week) {
    formatDateTime = `${Math.floor(moment / day)} days ago`;
  } else {
    formatDateTime = `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;
  }

  return formatDateTime;
}