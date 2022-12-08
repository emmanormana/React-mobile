import RegisterForm from "./RegisterForm";
import Alert from "@mui/material/Alert";
const Register = () => {
  return (
    <>
      <RegisterForm
        SucessComp={
          <Alert severity="success">
            User Created
            <a href="/"> Sign In</a>
          </Alert>
        }
      />
    </>
  );
};

export default Register;
