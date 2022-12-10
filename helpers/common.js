import moment from "moment";
import { useContext } from "react";
import AddToastContext from "../components/context/add-toast.context";

export const formatDDMMYYYY = (date = "") => {
  if (!date) return "";
  return moment(date).format("DD/MM/YYYY");
};

export const formatCurrency = (num = 0) => {
  const formatter = new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  });

  return formatter.format(num).replace("₫", "VNĐ");
};

export function handleResponse(input = {}) {
  const {
    successMsg = "Lưu thành công",
    errMsg = "Lỗi, xin thử lại sau",
    onSuccess,
  } = input;

  const addToast = useContext(AddToastContext);
  return {
    onCompleted: (d) => {
      if (d) {
        addToast.success(successMsg);
        if (typeof onSuccess === "function") {
          onSuccess(d);
        }
      }
    },
    onError: (e) => {
      console.log(e);
      addToast.error(errMsg);
    },
  };
}
