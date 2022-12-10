import { createContext } from 'react'

const CreditHistoriesContext = createContext({
  isModalOpen: false,
  openModal:  (data) => {},
  closeModal: () => {},
})

export default CreditHistoriesContext
