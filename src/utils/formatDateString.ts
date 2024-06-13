const formatDateString = (timestamp: string): string => {
  const date = new Date(timestamp);
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  };
  const formattedDate = date
    .toLocaleDateString("ko-KR", options)
    .replace(/\./g, "-")
    .split("-")
    .join(".");
  return formattedDate;
};

export default formatDateString;
