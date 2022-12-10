import { createContext } from 'react'

const InstalmentHistoriesContext = createContext({
  isModalOpen: false,
  openModal:  (data) => {},
  closeModal: () => {},
})

export default InstalmentHistoriesContext
