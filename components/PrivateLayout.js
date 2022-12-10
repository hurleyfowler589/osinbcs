import { useRouter } from "next/router";
import { useEffect } from "react";

const PrivateLayout = ({ children }) => {
  const router = useRouter()

  useEffect(() => {
    if (window) {
      !localStorage.getItem('token') && router.push('/login')
    }
  }, [])

  return children;
};
export default PrivateLayout;
