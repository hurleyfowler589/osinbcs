import { useCallback, useState } from "react";
import EditInstalmentContext from "../context/instalment/edit-instalment.context";
import EditInstalmentModal from "../instalment/edit-instalment-modal";

export default function withEditInstalmentModal(Components) {
  return function withEditInstalmentModalComponent(props) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [data, setData] = useState(null);

    const openModal = useCallback((input) => {
      console.log('input----------', input)
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
        <EditInstalmentContext.Provider
          value={{
            isModalOpen: isModalOpen,
            closeModal: closeModal,
            openModal: openModal,
          }}
        >
          <Components {...props} />
          <EditInstalmentModal
            isModalOpen={isModalOpen}
            handleOk={handleOk}
            closeModal={closeModal}
            detail={data}
          />
        </EditInstalmentContext.Provider>
      </>
    );
  };
}
