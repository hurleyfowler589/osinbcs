import { useCallback, useState } from "react";
import { Modal } from "antd";
import LogoutContext from "./context/logout-context";

export default function withLogoutModal(Components) {
  return function withLogoutModalComponent(props) {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = useCallback(() => {
      setIsModalOpen(true);
    }, []);

    const handleOk = () => {
      setIsModalOpen(false);
    };

    const closeModal = () => {
      setIsModalOpen(false);
    };

    return (
      <>
        <LogoutContext.Provider
          value={{
            isModalOpen: isModalOpen,
            closeModal: closeModal,
            openModal: openModal,
          }}
        >
          <Components {...props} />
          <Modal
            title="Bạn có chắc muốn thoát?"
            open={isModalOpen}
            onOk={handleOk}
            onCancel={closeModal}
          ></Modal>
        </LogoutContext.Provider>
      </>
    );
  };
}
