export const formatDate = (inputDate, type = "months") => {
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
