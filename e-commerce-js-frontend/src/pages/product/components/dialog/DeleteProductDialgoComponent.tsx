import * as React from "react";
import Button from "@mui/material/Button";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useProductContext } from "../../context/useProductContext";
import { deleteProduct } from "../../services/procutService";
import { showSnackbar } from "../../../../redux/states/snackbarSlice";
import { useAppDispatch } from "../../../../hooks/hook";

interface DelteProductProps {
  onCancel?: () => void;
  productId: number | undefined;
}

export const DeleteDialog: React.FC<DelteProductProps> = ({
  onCancel,
  productId,
}) => {
  const dispatch = useAppDispatch();
  const { removeProduct } = useProductContext();
  const handleDeleteProduct = async () => {
    if (productId) {
      const response = await deleteProduct(productId);
      if (response.status === 200) {
        dispatch(
          showSnackbar({
            message: "Producto eliminado correctamente",
            severity: "success",
          })
        );
      }
      removeProduct(productId);
      if (onCancel) onCancel();
    }
  };
  return (
    <>
      <DialogTitle id="alert-dialog-title">
        {"Use Google's location service?"}
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          Let Google help apps determine location. This means sending anonymous
          location data to Google, even when no apps are running.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onCancel}>Cancelar</Button>
        <Button onClick={handleDeleteProduct}>Borrar</Button>
      </DialogActions>
    </>
  );
};
