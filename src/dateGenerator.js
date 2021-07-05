const d = new Date();

const date =
  ("0" + d.getDate()).slice(-2) +
  "-" +
  ("0" + (d.getMonth() + 1)).slice(-2) +
  "-" +
  d.getFullYear();

export default date;
