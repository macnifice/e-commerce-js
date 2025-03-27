import { Formik, Form, Field, FormikHelpers } from "formik";
import { Button } from "@mui/material";
import { businessSchema } from "./forSchema";
import { useAppDispatch } from "../../../../hooks/hook";
import { showSnackbar } from "../../../../redux/states/snackbarSlice";
import {
  BusinessResponse,
  CreateBusiness,
} from "../../../../models/business.interface";
import { createBusiness } from "../../services/businessService";
import { useBusinessContext } from "../../context/useBusinessContext";

interface FormValues {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  role: string;
}

// const initialState: Business = {
//   id: "",
//   name: "",
//   tag: "",
//   email: "",
// };

// interface BusinessFormProps {
//   business: Business | null;
//   onSave: (business: Business) => void;
//   onCancel: () => void;
// }

function BusinessForm({ onCancel }: { onCancel: () => void }) {
  const dispatch = useAppDispatch();
  const { refreshBusinesses } = useBusinessContext();

  const handleSubmit = async (
    values: FormValues,
    actions: FormikHelpers<FormValues>
  ) => {
    console.log(values);
    const business: CreateBusiness = {
      name: values.name,
      email: values.email,
      password: values.password,
      role: values.role,
    };
    const response: BusinessResponse = await createBusiness(business);
    if (response.status === 201) {
      actions.resetForm();
      await refreshBusinesses();
      dispatch(
        showSnackbar({
          message: "Negocio creado correctamente",
          severity: "success",
        })
      );
      onCancel();
    } else {
      dispatch(
        showSnackbar({
          message: response.data.message || "Error al crear negocio",
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
          role: "business",
        }}
        validationSchema={businessSchema}
        onSubmit={handleSubmit}
      >
        {(props) => (
          <Form>
            <div className="register-form-group">
              <Field
                type="text"
                name="name"
                placeholder="Nombre del negocio"
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
                placeholder="Confirmar contraseña"
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
            <div className="business-form-buttons">
              <Button
                variant="text"
                onClick={() => onCancel()}
                className="business-form-cancel"
              >
                Cancelar
              </Button>
              <Button
                type="submit"
                variant="contained"
                className="business-form-save"
              >
                Guardar
              </Button>
            </div>
          </Form>
        )}
      </Formik>
    </>
  );
}

export default BusinessForm;
