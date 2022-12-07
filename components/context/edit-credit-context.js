import { createContext } from 'react'

const EditCreditContext = createContext({
  isModalOpen: false,
  openModal:  () => {},
  closeModal: () => {},
})

export default EditCreditContext
