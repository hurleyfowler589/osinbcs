import { useRouter } from "next/router";
import { useEffect } from "react";
import jwtDecode from "jwt-decode";

const PrivateLayout = ({ children }) => {
  const router = useRouter();
  console.log('tetawetewatwe')
  useEffect(() => {
    if (window) {
      const token = localStorage.getItem("token");
      if (!token) {
        router.push("/login?token=0192");
      } else {
        if (jwtDecode(token).exp * 1000 < Date.now()) {
        	router.push("/login?token=12321321");
        } else {
          if (jwtDecode(token).exp * 1000 < Date.now()) {
            router.push("/login?token=12321321");
          }
        }
      }
    }
  }, []);

  return children;
};
export default PrivateLayout;
