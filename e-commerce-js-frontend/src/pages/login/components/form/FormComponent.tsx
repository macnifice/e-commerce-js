import { Formik, Form, Field, FormikHelpers } from "formik";
import { formSchema } from "./formSchema";
import ButtonComponent from "./ButtonComponent";
import { Login, LoginResponse } from "../../../../models/user.interface";
import { login } from "../../services/loginService";
import { loginSuccess } from "../../../../redux/states/authSlice";
import { useAppDispatch } from "../../../../hooks/hook";
import { showSnackbar } from "../../../../redux/states/snackbarSlice";
import { useNavigate } from "react-router-dom";

interface FormValues {
  email: string;
  password: string;
}

function FormComponent() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const handleSubmit = async (
    values: FormValues,
    actions: FormikHelpers<FormValues>
  ) => {
    const loginData: Login = {
      email: values.email,
      password: values.password,
    };
    const response: LoginResponse = await login(loginData);

    switch (response.status) {
      case 401:
        dispatch(
          showSnackbar({
            message: response.data.message || "Error al iniciar sesión",
            severity: "error",
          })
        );
        break;
      case 409:
        dispatch(
          showSnackbar({
            message: response.data.message || "Error al iniciar sesión",
            severity: "warning",
          })
        );
        dispatch(
          loginSuccess({
            isAuthenticated: false,
            user: response.data.user || null,
          })
        );
        navigate(`/verify-account/${response.data.user?.id}`);
        break;
      case 200:
        dispatch(
          showSnackbar({
            message: "Inicio de sesión exitoso",
            severity: "success",
          })
        );
        dispatch(
          loginSuccess({
            isAuthenticated: true,
            user: response.data.user || null,
          })
        );
        navigate("/");
        break;
      default:
        dispatch(
          showSnackbar({
            message: "Error al iniciar sesión",
            severity: "error",
          })
        );
        break;
    }
    actions.setSubmitting(false);
    actions.resetForm();
  };

  return (
    <Formik
      initialValues={{ email: "", password: "" }}
      onSubmit={(values, actions) => handleSubmit(values, actions)}
      validationSchema={formSchema}
    >
      {(props) => (
        <Form>
          <div className="login-form-group">
            <Field
              type="email"
              name="email"
              placeholder="Correo electrónico"
              onBlur={props.handleBlur}
              className={`login-input ${
                props.errors.email && props.touched.email
                  ? "error"
                  : ""
              }`}
            />
            {props.errors.email && props.touched.email && (
              <div className="login-error-message">{props.errors.email}</div>
            )}
          </div>
          <div className="login-form-group">
            <Field
              type="password"
              name="password"
              onBlur={props.handleBlur}
              placeholder="Contraseña"
              className={`login-input ${
                props.errors.password && props.touched.password
                  ? "error"
                  : ""
              }`}
            />
            {props.errors.password && props.touched.password && (
              <div className="login-error-message">{props.errors.password}</div>
            )}
          </div>
          <div>
            <ButtonComponent
              isLoading={props.isSubmitting}
              isValid={props.isValid}
            />
          </div>
        </Form>
      )}
    </Formik>
  );
}

export default FormComponent;
