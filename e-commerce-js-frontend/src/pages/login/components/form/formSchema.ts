import * as yup from "yup";

export const formSchema = yup.object().shape({
    email: yup
        .string()
        .email("Correo electrónico inválido")
        .matches(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, "Correo electrónico inválido")
        .required("Correo electrónico requerido"),
    password: yup
        .string()
        .min(8, "La contraseña debe tener al menos 8 caracteres")
        .max(20, "La contraseña debe tener menos de 20 caracteres")
        .required("Contraseña requerida"),
});

