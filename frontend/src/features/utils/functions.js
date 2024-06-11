export const formatDate = (inputDate, type = "months") => {
  if (!inputDate) return "";
  const dateObj =
    typeof inputDate === "string" ? new Date(inputDate) : inputDate;

  const months = [
    "січ",
    "лют",
    "бер",
    "кві",
    "тра",
    "чер",
    "лип",
    "сер",
    "вер",
    "жов",
    "лис",
    "гру",
  ];

  if (type === "dots") {
    const day = String(dateObj.getUTCDate()).padStart(2, "0");
    const month = String(dateObj.getUTCMonth() + 1).padStart(2, "0");
    const year = dateObj.getUTCFullYear();

    return `${day}.${month}.${year}`;
  }

  if (type === "hyphen") {
    const year = dateObj.getFullYear();
    const month = String(dateObj.getMonth() + 1).padStart(2, "0");
    const day = String(dateObj.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
  }

  const formattedDate = `${dateObj.getDate()} ${
    months[dateObj.getMonth()]
  }, ${dateObj.getFullYear()}`;

  return formattedDate;
};

export const formatTime = (inputDate) => {
  if (!inputDate) return "";
  const dateObj =
    typeof inputDate === "string" ? new Date(inputDate) : inputDate;
  const hours = dateObj.getHours().toString().padStart(2, "0");
  const minutes = dateObj.getMinutes().toString().padStart(2, "0");
  return `${hours}:${minutes}`;
};

export const getFileExtension = (fileName = "") => {
  const lastIndex = fileName.lastIndexOf(".");
  if (fileName !== -1) {
    return fileName.slice(lastIndex + 1);
  } else {
    return "";
  }
};

export const getFormateSort = (sortName, sortType) => {
  return `${
    sortType
      ? `&sort=${
          sortType === "asc"
            ? sortName
            : sortType === "desc"
            ? `-${sortName}`
            : ""
        }`
      : ""
  }`;
};

export const capitalizeFirstLetter = (string) => {
  if (!string) return string;
  return string.charAt(0).toUpperCase() + string.slice(1);
};

function getPlural(count, forms) {
  if (count % 10 === 1 && count % 100 !== 11) {
    return forms[0];
  } else if (
    count % 10 >= 2 &&
    count % 10 <= 4 &&
    (count % 100 < 10 || count % 100 >= 20)
  ) {
    return forms[1];
  } else {
    return forms[2];
  }
}

export function getRelativeTime(date) {
  const now = new Date();
  const diffInSeconds = Math.floor((now - date) / 1000);

  const intervals = [
    { label: ["секунда", "секунди", "секунд"], seconds: 1 },
    { label: ["хвилина", "хвилини", "хвилин"], seconds: 60 },
    { label: ["година", "години", "годин"], seconds: 3600 },
    { label: ["день", "дні", "днів"], seconds: 86400 },
    { label: ["місяць", "місяці", "місяців"], seconds: 2592000 },
    { label: ["рік", "роки", "років"], seconds: 31536000 },
  ];

  for (let i = intervals.length - 1; i >= 0; i--) {
    const interval = intervals[i];
    const count = Math.floor(diffInSeconds / interval.seconds);
    if (count > 0) {
      return `${count} ${getPlural(count, interval.label)} тому`;
    }
  }

  return "щойно";
}

export function getCommentTime(createdAt, updatedAt, edited) {
  const date = edited ? updatedAt : createdAt;
  const relativeTime = getRelativeTime(date);
  return edited ? `Змінено ${relativeTime}` : relativeTime;
}

export const convertTimeHumanFormat = (seconds) => {
  let hours = Math.floor(seconds / 3600);
  let minutes = Math.floor((seconds % 3600) / 60);
  let remainingSeconds = Math.floor(seconds % 60);

  hours = hours < 10 ? "0" + hours : hours;
  minutes = minutes < 10 ? "0" + minutes : minutes;
  remainingSeconds =
    remainingSeconds < 10 ? "0" + remainingSeconds : remainingSeconds;

  return hours + ":" + minutes + ":" + remainingSeconds;
};
