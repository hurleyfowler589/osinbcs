import { createContext } from 'react'

const LogoutContext = createContext({
  isModalOpen: false,
  openModal:  () => {},
  closeModal: () => {},
})

export default LogoutContext
