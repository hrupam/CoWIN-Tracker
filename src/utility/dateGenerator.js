export const formatDate = (date) => {
  const day = ("0" + date.getDate()).slice(-2);
  const month = ("0" + (date.getMonth() + 1)).slice(-2);
  const year = date.getFullYear();
  return year + "-" + month + "-" + day;
};

export const reverseDate = (date) => {
  const [year, month, day] = date.split("-");
  return day + "-" + month + "-" + year;
};
