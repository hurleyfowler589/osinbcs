import { useCallback, useState } from "react";
import InstalmentHistoriesContext from "../context/instalment/instalment-histories.context";
import InstalmentHistoriesModal from "../instalment/instalment-histories-modal";

export default function withInstalmentHistoriesModal(Components) {
  return function withInstalmentHistoriesModalComponent(props) {
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
        <InstalmentHistoriesContext.Provider
          value={{
            isModalOpen: isModalOpen,
            closeModal: closeModal,
            openModal: openModal,
          }}
        >
          <Components {...props} />
          <InstalmentHistoriesModal
            isModalOpen={isModalOpen}
            handleOk={handleOk}
            closeModal={closeModal}
            detail={data}
          />
        </InstalmentHistoriesContext.Provider>
      </>
    );
  };
}
