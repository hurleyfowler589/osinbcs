import Credit from "../components/credit/index";
import PrivateLayout from "../components/PrivateLayout";

const CreditPage = () => {
  return (
    <PrivateLayout path="/credit" user={{}}>
      <Credit />
    </PrivateLayout>
  );
};
export default CreditPage;
