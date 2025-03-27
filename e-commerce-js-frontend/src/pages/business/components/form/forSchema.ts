import * as yup from "yup";

export const businessSchema = yup.object().shape({
    name: yup
        .string()
        .required("El nombre es requerido"),
    email: yup
        .string()
        .email("El correo electrónico es inválido")
        .matches(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, "Correo electrónico inválido")
        .required("El correo electrónico es requerido"),
    password: yup
        .string()
        .min(8, "La contraseña debe tener al menos 8 caracteres")
        .max(20, "La contraseña debe tener menos de 20 caracteres")
        .required("La contraseña es requerida"),
    confirmPassword: yup
        .string()
        .oneOf([yup.ref("password"), undefined], "Las contraseñas no coinciden")
        .required("La confirmación de contraseña es requerida")
});
