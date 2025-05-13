import Loader from "./Loader";
import Authentication from "./security/Authentication";

const Auth = () => {
  return (
    <div>
      <Authentication></Authentication>
      <Loader />
    </div>
  );
};

export default Auth;
