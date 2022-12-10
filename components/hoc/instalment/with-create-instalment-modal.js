import { useCallback, useState } from "react";
import CreateInstalmentContext from "../../context/instalment/create-instalment.context";
import CreateInstalmentModal from "../../instalment/create-instalment-modal";

export default function withCreateInstalmentModal(Components) {
  return function withCreateInstalmentModalComponent(props) {
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
        <CreateInstalmentContext.Provider
          value={{
            isModalOpen: isModalOpen,
            closeModal: closeModal,
            openModal: openModal,
          }}
        >
          <Components {...props} />
          <CreateInstalmentModal
            isModalOpen={isModalOpen}
            handleOk={handleOk}
            closeModal={closeModal}
          />
        </CreateInstalmentContext.Provider>
      </>
    );
  };
}
