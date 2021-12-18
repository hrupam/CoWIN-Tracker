const formatCenterTime = (time) => {
  const timeArray = time.split(":");
  const hour = parseInt(timeArray[0]);
  const minute = timeArray[1];
  if (hour < 12) return `${hour}:${minute} AM`;
  else if (hour === 12) return `${hour}:${minute} PM`;
  else return `${hour - 12}:${minute} PM`;
};

export default formatCenterTime;
