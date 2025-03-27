import TitleComponent from "./components/title/TitleComponent";
import FormComponent from "./components/form/FormComponent";
import "./login.css";

const LoginPage = () => {
  return (
    <div className="login-container">
      <div className="login-card">
        <TitleComponent />
        <FormComponent />
      </div>
    </div>
  );
};

export default LoginPage;
