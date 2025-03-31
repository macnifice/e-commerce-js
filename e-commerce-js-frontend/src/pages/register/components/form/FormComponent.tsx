import { Formik, Form, Field, FormikHelpers } from "formik";
import { formSchema } from "./forSchema";
import ButtonComponent from "./ButtonComponent";
import { useAppDispatch } from "../../../../hooks/hook";
import { register } from "../../services/registerService";
import { Register } from "../../../../models/user.interface";
import { registerSuccess } from "../../../../redux/states/authSlice";
import { showSnackbar } from "../../../../redux/states/snackbarSlice";
import { useNavigate } from "react-router-dom";

interface FormValues {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

function FormComponent() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (
    values: FormValues,
    actions: FormikHelpers<FormValues>
  ) => {
    const formData: Register = {
      name: values.name,
      email: values.email,
      password: values.password,
      role: "customer",
    };

    const response = await register(formData);
    if (response) {
      dispatch(
        registerSuccess({
          isAuthenticated: false,
          user: response,
          isLoading: true,
        })
      );
      dispatch(
        showSnackbar({
          message: "Usuario registrado correctamente, verifique su correo",
          severity: "success",
        })
      );
      navigate(`/verify-account/${response.id}`);
      actions.setSubmitting(false);
      actions.resetForm();
    } else {
      dispatch(
        showSnackbar({
          message: "Error al registrar el usuario",
          severity: "error",
        })
      );
    }
  };

  return (
    <>
      <Formik
        initialValues={{
          name: "",
          email: "",
          password: "",
          confirmPassword: "",
        }}
        onSubmit={(values, actions) => handleSubmit(values, actions)}
        validationSchema={formSchema}
      >
        {(props) => (
          <Form>
            <div className="register-form-group">
              <Field
                type="text"
                name="name"
                placeholder="Nombre Completo"
                onBlur={props.handleBlur}
                className={`register-input ${
                  props.errors.name && props.touched.name ? "error" : ""
                }`}
              />
              {props.errors.name && props.touched.name && (
                <div className="register-error-message">
                  {props.errors.name}
                </div>
              )}
            </div>
            <div className="register-form-group">
              <Field
                type="email"
                name="email"
                placeholder="Correo Electrónico"
                onBlur={props.handleBlur}
                className={`register-input ${
                  props.errors.email && props.touched.email ? "error" : ""
                }`}
              />
              {props.errors.email && props.touched.email && (
                <div className="register-error-message">
                  {props.errors.email}
                </div>
              )}
            </div>
            <div className="register-form-group">
              <Field
                type="password"
                name="password"
                placeholder="Contraseña"
                onBlur={props.handleBlur}
                className={`register-input ${
                  props.errors.password && props.touched.password ? "error" : ""
                }`}
              />
              {props.errors.password && props.touched.password && (
                <div className="register-error-message">
                  {props.errors.password}
                </div>
              )}
            </div>
            <div className="register-form-group">
              <Field
                type="password"
                name="confirmPassword"
                placeholder="Confirmar Contraseña"
                onBlur={props.handleBlur}
                className={`register-input ${
                  props.errors.confirmPassword && props.touched.confirmPassword
                    ? "error"
                    : ""
                }`}
              />
              {props.errors.confirmPassword &&
                props.touched.confirmPassword && (
                  <div className="register-error-message">
                    {props.errors.confirmPassword}
                  </div>
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
    </>
  );
}

export default FormComponent;
