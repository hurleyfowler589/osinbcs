import Home from "./Home";

const PrivateLayout = ({ children, user, path = "/credit" }) => {

  // TODO check token here, if not return to page unauthorize

  return <Home path={path}>{children}</Home>;
};
export default PrivateLayout;
