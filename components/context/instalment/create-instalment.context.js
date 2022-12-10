import { createContext } from 'react'

const CreateInstalmentContext = createContext({
  isModalOpen: false,
  openModal:  () => {},
  closeModal: () => {},
})

export default CreateInstalmentContext
