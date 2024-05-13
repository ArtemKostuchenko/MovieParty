export const formatDate = (inputDate) => {
  const dateObj = new Date(inputDate);

  const months = [
    "січня",
    "лютого",
    "березня",
    "квітня",
    "травня",
    "червня",
    "липня",
    "серпня",
    "вересня",
    "жовтня",
    "листопада",
    "грудня",
  ];

  const day = dateObj.getDate();
  const month = months[dateObj.getMonth()];
  const year = dateObj.getFullYear();

  return `${day} ${month} ${year} рік`;
};

export const getFileExtension = (fileName = "") => {
  const lastIndex = fileName.lastIndexOf(".");
  if (fileName !== -1) {
    return fileName.slice(lastIndex + 1);
  } else {
    return "";
  }
};
