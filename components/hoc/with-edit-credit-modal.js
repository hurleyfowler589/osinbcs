import { useCallback, useState } from "react";
import { Modal } from "antd";
import EditCreditContext from "../context/credit/edit-credit-context";
import EditCreditModal from "../credit/EditCreditModal";

export default function withEditCreditModal(Components) {
  return function withEditCreditModalComponent(props) {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = useCallback(() => {
      setIsModalOpen(true);
    }, []);

    const handleOk = useCallback(() => {
      setIsModalOpen(false);
    }, []);

    const closeModal = useCallback(() => {
      setIsModalOpen(false);
    }, []);

    return (
      <>
        <EditCreditContext.Provider
          value={{
            isModalOpen: isModalOpen,
            closeModal: closeModal,
            openModal: openModal,
          }}
        >
          <Components {...props} />
          <EditCreditModal
            isModalOpen={isModalOpen}
            handleOk={handleOk}
            closeModal={closeModal}
          />
        </EditCreditContext.Provider>
      </>
    );
  };
}
