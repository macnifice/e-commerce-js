import { FormikHelpers, useFormik } from "formik";
import { Button, TextField } from "@mui/material";
import { businessSchema } from "./forSchema";
import { useAppDispatch } from "../../../../hooks/hook";
import { showSnackbar } from "../../../../redux/states/snackbarSlice";
import {
  Business,
  BusinessResponse,
  CreateBusiness,
} from "../../../../models/business.interface";
import { createBusiness } from "../../services/businessService";
import { useBusinessContext } from "../../context/useBusinessContext";
import "./formComponent.css";

interface FormValues {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  role: string;
}

function BusinessForm({ onCancel }: { onCancel: () => void }) {
  const dispatch = useAppDispatch();
  const { addBusiness } = useBusinessContext();

  const handleSubmit = async (
    values: FormValues,
    actions: FormikHelpers<FormValues>
  ) => {
    const business: CreateBusiness = {
      name: values.name,
      email: values.email,
      password: values.password,
      role: values.role,
    };
    const response: BusinessResponse = await createBusiness(business);
    if (response.status === 201) {
      dispatch(
        showSnackbar({
          message: "Negocio creado correctamente",
          severity: "success",
        })
      );
      const business = response.data as Business;
      await addBusiness(business);
      actions.resetForm();
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

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      role: "business",
    },
    validationSchema: businessSchema,
    onSubmit: handleSubmit,
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <div className="business-form-group">
        <TextField
          fullWidth
          className="business-input"
          label="Nombre del negocio"
          name="name"
          value={formik.values.name}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.name && Boolean(formik.errors.name)}
          helperText={formik.touched.name && formik.errors.name}
        />
      </div>
      <div className="business-form-group">
        <TextField
          fullWidth
          className="business-input"
          label="Correo Electrónico"
          name="email"
          value={formik.values.email}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.email && Boolean(formik.errors.email)}
          helperText={formik.touched.email && formik.errors.email}
        />
      </div>
      <div className="business-form-group">
        <TextField
          fullWidth
          className="business-input"
          type="password"
          name="password"
          placeholder="Contraseña"
          onChange={formik.handleChange}
          value={formik.values.password}
          onBlur={formik.handleBlur}
          error={formik.touched.password && Boolean(formik.errors.password)}
          helperText={formik.touched.password && formik.errors.password}
        />
      </div>
      <div className="business-form-group">
        <TextField
          fullWidth
          className="business-input"
          type="password"
          name="confirmPassword"
          placeholder="Confirmar contraseña"
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
          value={formik.values.confirmPassword}
          error={
            formik.touched.confirmPassword &&
            Boolean(formik.errors.confirmPassword)
          }
          helperText={
            formik.touched.confirmPassword && formik.errors.confirmPassword
          }
        />
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
    </form>
  );
}

export default BusinessForm;
