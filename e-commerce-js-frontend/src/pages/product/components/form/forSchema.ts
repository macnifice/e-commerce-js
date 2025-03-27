import * as yup from "yup";

export const productSchema = yup.object().shape({
    name: yup
        .string()
        .required("El nombre es requerido"),
    description: yup
        .string()
        .optional(),
    price: yup
        .number()
        .min(1, "El precio debe ser mayor que 0")
        .required("El precio es requerido"),
    stock: yup
        .number()
        .min(1, "El stock debe ser mayor que 0")
        .integer("El stock debe ser un número entero")
        .required("El stock es requerido"),
    image: yup.string()
        .url("La URL de la imagen debe ser válida")
        .matches(/^https?:\/\/.*\.(jpg|jpeg|png|gif|webp|bmp|svg|tiff)(\?.*)?$/i
            , "La URL de la imagen debe ser una imagen válida")
        .required("La imagen es requerida"),
    businessId: yup
        .number()
        .required("Selecciona una empresa"),
});


