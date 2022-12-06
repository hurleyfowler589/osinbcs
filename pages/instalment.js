import Instalment from "../components/instalment";
import PrivateLayout from "../components/PrivateLayout";

const InstalmentPage = () => {
  return (
    <PrivateLayout path="/instalment" user={{}}>
      <Instalment />
    </PrivateLayout>
  );
};
export default InstalmentPage;
