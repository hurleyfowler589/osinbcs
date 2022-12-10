import { createContext } from 'react'

const CreateCreditContext = createContext({
  isModalOpen: false,
  openModal:  () => {},
  closeModal: () => {},
})

export default CreateCreditContext
