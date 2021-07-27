export const dateFormatter = (date) => {
  const day = ("0" + date.getDate()).slice(-2);
  const month = ("0" + (date.getMonth() + 1)).slice(-2);
  const year = date.getFullYear();
  return year + "-" + month + "-" + day;
};

export const dateReverser = (date) => {
  const [year, month, day] = date.split("-");
  return day + "-" + month + "-" + year;
};

// export const date = dateFormatter(new Date());
