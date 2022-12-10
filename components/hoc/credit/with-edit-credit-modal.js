import { useCallback, useState } from "react";
import EditCreditContext from "../../context/credit/edit-credit-context";
import EditCreditModal from "../../credit/edit-credit-modal";

export default function withEditCreditModal(Components) {
  return function withEditCreditModalComponent(props) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [data, setData] = useState(null);

    const openModal = useCallback((input) => {
      setIsModalOpen(true);
      if (input) setData(input);
    }, []);

    const handleOk = useCallback(() => {
      setIsModalOpen(false);
      setData(null)
    }, []);

    const closeModal = useCallback(() => {
      setIsModalOpen(false);
      setData(null)
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
            detail={data}
          />
        </EditCreditContext.Provider>
      </>
    );
  };
}
