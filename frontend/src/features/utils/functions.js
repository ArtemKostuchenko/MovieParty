export const formatDate = (inputDate) => {
  const dateObj = new Date(inputDate);

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

  const formattedDate = `${dateObj.getDate()} ${
    months[dateObj.getMonth()]
  }, ${dateObj.getFullYear()}`;

  return formattedDate;
};

export const getFileExtension = (fileName = "") => {
  const lastIndex = fileName.lastIndexOf(".");
  if (fileName !== -1) {
    return fileName.slice(lastIndex + 1);
  } else {
    return "";
  }
};
