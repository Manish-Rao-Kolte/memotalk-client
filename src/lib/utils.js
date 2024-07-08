import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

function formatTime(date) {
  let hours = date.getHours();
  const minutes = date.getMinutes();
  const ampm = hours >= 12 ? "PM" : "AM";
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'
  const minutesStr = minutes < 10 ? "0" + minutes : minutes;
  return `${hours}:${minutesStr} ${ampm}`;
}

export const formatDate = (storedDate) => {
  const currentDate = new Date();
  const givenDate = new Date(storedDate);

  const oneDay = 24 * 60 * 60 * 1000; // milliseconds in one day
  const oneWeek = 7 * oneDay; // milliseconds in one week

  // Check if the given date is today
  if (currentDate.toDateString() === givenDate.toDateString()) {
    return formatTime(givenDate);
  }

  // Check if the given date was yesterday
  const yesterday = new Date(currentDate.getTime() - oneDay);
  if (yesterday.toDateString() === givenDate.toDateString()) {
    return `Yesterday, ${formatTime(givenDate)}`;
  }

  // Check if the given date is within the past week
  const oneWeekAgo = new Date(currentDate.getTime() - oneWeek);
  if (givenDate >= oneWeekAgo) {
    const dayName = givenDate.toLocaleDateString("en-US", { weekday: "long" });
    return `${dayName}, ${formatTime(givenDate)}`;
  }

  // Otherwise, return the date in the format 'Month Day, Year'
  const monthDayYear = givenDate.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  return monthDayYear;
};

export const getTimeAndDate = (timestamp) => {
  const date = new Date(timestamp);

  // Options for formatting the date
  const dateOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "Asia/Kolkata",
  };
  // Options for formatting time
  const timeOptions = {
    hour: "numeric",
    minute: "numeric",
    hour12: true,
    timeZone: "Asia/Kolkata",
  };
  return {
    time: date
      .toLocaleTimeString("en-US", timeOptions)
      .replace("am", "AM")
      .replace("pm", "PM"),
    date: date.toLocaleDateString("en-US", dateOptions),
  };
};

export const formatTo12Hour = (timestamp) => {
  const date = new Date(timestamp);

  let hours = date.getHours();
  const minutes = date.getMinutes();
  const ampm = hours >= 12 ? "PM" : "AM";

  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'

  const minutesFormatted = minutes < 10 ? "0" + minutes : minutes;

  const strTime = hours + ":" + minutesFormatted + " " + ampm;
  return strTime;
};
