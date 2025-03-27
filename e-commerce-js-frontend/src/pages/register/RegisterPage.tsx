import Title from "./components/title/TitleComponent";
import FormComponent from "./components/form/FormComponent";
import "./register.css";

const RegisterPage = () => {
  return (
    <div className="register-container">
      <div className="register-card">
        <Title />
        <FormComponent />
      </div>
    </div>
  );
};

export default RegisterPage;
