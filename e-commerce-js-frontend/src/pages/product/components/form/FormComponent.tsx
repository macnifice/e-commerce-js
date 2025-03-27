import { useFormik } from "formik";
import { Button, TextField } from "@mui/material";
import { productSchema } from "./forSchema";
import { CreateProduct } from "../../../../models/product.interface";
import { createProduct } from "../../services/procutService";
import { useAppDispatch, useAppSelector } from "../../../../hooks/hook";
import { showSnackbar } from "../../../../redux/states/snackbarSlice";
import "../../../product/components/form/formComponent.css";

function ProductForm({ onCancel }: { onCancel: () => void }) {
  const user = useAppSelector((state) => state.auth.user);
  const dispatch = useAppDispatch();
  const formik = useFormik({
    initialValues: {
      name: "",
      description: "",
      price: 0,
      stock: 0,
      image: "",
      businessId: user?.id || 0,
    },
    validationSchema: productSchema,
    onSubmit: async (values) => {
      const product: CreateProduct = {
        name: values.name,
        description: values.description,
        price: values.price,
        stock: values.stock,
        image: values.image,
        businessId: user?.id || 0,
      };
      const response = await createProduct(product);
      console.log(response);
      if (response.status === 201) {
        dispatch(
          showSnackbar({
            message: "Producto creado correctamente",
            severity: "success",
          })
        );
        onCancel();
      }
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <div className="product-form-group">
        <TextField
          fullWidth
          className="product-input"
          label="Nombre del producto"
          name="name"
          value={formik.values.name}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.name && Boolean(formik.errors.name)}
          helperText={formik.touched.name && formik.errors.name}
        />
      </div>

      <div className="product-form-group">
        <TextField
          fullWidth
          className="product-input"
          label="Precio"
          name="price"
          type="number"
          value={formik.values.price}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.price && Boolean(formik.errors.price)}
          helperText={formik.touched.price && formik.errors.price}
        />
      </div>

      <div className="product-form-group">
        <TextField
          fullWidth
          className="product-input"
          label="Stock"
          name="stock"
          type="number"
          value={formik.values.stock}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.stock && Boolean(formik.errors.stock)}
          helperText={formik.touched.stock && formik.errors.stock}
        />
      </div>

      <div className="product-form-group">
        <TextField
          fullWidth
          className="product-input"
          label="URL de imagen"
          name="image"
          value={formik.values.image}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.image && Boolean(formik.errors.image)}
          helperText={formik.touched.image && formik.errors.image}
        />
      </div>

      <div className="product-form-group">
        <TextField
          fullWidth
          className="product-input"
          label="Descripción"
          name="description"
          multiline
          rows={2}
          value={formik.values.description}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={
            formik.touched.description && Boolean(formik.errors.description)
          }
          helperText={formik.touched.description && formik.errors.description}
        />
      </div>

      <div className="product-form-buttons">
        <Button
          variant="text"
          onClick={() => onCancel()}
          className="product-form-cancel"
        >
          Cancelar
        </Button>
        <Button type="submit" variant="contained" className="product-form-save">
          Guardar
        </Button>
      </div>
    </form>
  );
}

export default ProductForm;
