import { useCallback, useState } from "react";
import CreditHistoriesContext from "../../context/credit/credit-histories.context";
import CreditHistoriesModal from "../../credit/credit-histories-modal";

export default function withCreditHistoriesModal(Components) {
  return function withCreditHistoriesModalComponent(props) {
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
        <CreditHistoriesContext.Provider
          value={{
            isModalOpen: isModalOpen,
            closeModal: closeModal,
            openModal: openModal,
          }}
        >
          <Components {...props} />
          <CreditHistoriesModal
            isModalOpen={isModalOpen}
            handleOk={handleOk}
            closeModal={closeModal}
            detail={data}
          />
        </CreditHistoriesContext.Provider>
      </>
    );
  };
}
