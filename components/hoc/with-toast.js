import React from "react";
import { notification } from "antd";
import AddToastContext from "../context/add-toast.context";

export default function withToast(Components) {
  return function withToastComponent(props) {
    const [api, contextHolder] = notification.useNotification();

    const success = (message = "Đã lưu thành công!", placement = "topRight") => {
      api.success({
        message,
        placement,
      });
    };

    const error = (message = "Lỗi, Xin thử lại sau!", placement = "topRight") => {
      api.error({
        message,
        placement,
      });
    };

    return (
      <>
        <AddToastContext.Provider
          value={{
            error: error,
            success: success,
          }}
        >
          {contextHolder}
          <Components {...props} />
        </AddToastContext.Provider>
      </>
    );
  };
}
