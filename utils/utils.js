// utils/dateUtils.js

export function humanizeTimestamp(timestamp) {
  const now = new Date();
  const millisecondsAgo = now - timestamp;
  const secondsAgo = millisecondsAgo / 1000;
  const minutesAgo = secondsAgo / 60;
  const hoursAgo = minutesAgo / 60;
  const daysAgo = hoursAgo / 24;

  if (daysAgo >= 2) {
    return Math.floor(daysAgo) + " days ago";
  } else if (daysAgo >= 1) {
    return "yesterday";
  } else if (hoursAgo >= 1) {
    return Math.floor(hoursAgo) + " hours ago";
  } else if (minutesAgo >= 1) {
    return Math.floor(minutesAgo) + " minutes ago";
  } else {
    return "just now";
  }
}

export function formatTimestamp(timestamp) {
  const date = new Date(timestamp);
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
  ];
  const month = months[date.getMonth()];
  const day = date.getDate();
  const year = date.getFullYear();

  return `${month} ${day}, ${year}`;
}

export const calculateDateDifference = (startTripDate, endTripDate) => {
  const startUtc = Date.UTC(
    startTripDate.getFullYear(),
    startTripDate.getMonth(),
    startTripDate.getDate()
  );
  const endUtc = Date.UTC(
    endTripDate.getFullYear(),
    endTripDate.getMonth(),
    endTripDate.getDate()
  );
  const millisecondsPerDay = 1000 * 60 * 60 * 24;
  const timeDifference = endUtc - startUtc;
  const daysDifference = Math.floor(timeDifference / millisecondsPerDay) + 1;

  return daysDifference;
};
