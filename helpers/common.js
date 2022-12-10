import moment from "moment";

export const formatDDMMYYYY = (date = "") => {
  if (!date) return "";
  return moment(date).format("DD/MM/YYYY");
};

export const formatCurrency = (num = 0) => {
  if (!num) return num;

  const formatter = new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  });

  return formatter.format(num).replace('₫', 'VNĐ');
};
  