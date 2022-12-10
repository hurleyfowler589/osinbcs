import { createContext } from 'react'

const AddToastContext = createContext({
  error:  () => {},
  success: () => {},
})

export default AddToastContext
