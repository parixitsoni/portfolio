// Utility functions for date formatting and string manipulation

export const formatDate = (date) => {
  if (!date) return "";
  const options = { year: "numeric", month: "short" };
  return new Date(date).toLocaleDateString("en-US", options);
};

export const getDateRange = (startDate, endDate) => {
  return `${formatDate(startDate)} – ${formatDate(endDate)}`;
};

export const calculateDuration = (startDate, endDate) => {
  if (!startDate || !endDate) return "";
  const start = new Date(startDate);
  const end = new Date(endDate);
  const months = (end - start) / (1000 * 60 * 60 * 24 * 30.44);
  const years = Math.floor(months / 12);
  const remainingMonths = Math.floor(months % 12);

  if (years > 0 && remainingMonths > 0) return `${years}y ${remainingMonths}m`;
  if (years > 0) return `${years} year${years > 1 ? "s" : ""}`;
  return `${Math.round(months)} months`;
};

export const truncateText = (text, limit = 100) => {
  return text.length > limit ? text.substring(0, limit) + "..." : text;
};
