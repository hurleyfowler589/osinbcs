import { createContext } from 'react'

const EditInstalmentContext = createContext({
  isModalOpen: false,
  openModal:  (data) => {},
  closeModal: () => {},
})

export default EditInstalmentContext
