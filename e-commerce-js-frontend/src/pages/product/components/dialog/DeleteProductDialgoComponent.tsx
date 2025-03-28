import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useProductContext } from "../../context/useProductContext";
import { deleteProduct } from "../../services/procutService";
import { showSnackbar } from "../../../../redux/states/snackbarSlice";
import { useAppDispatch } from "../../../../hooks/hook";
import "./DeleteProductDialog.css"; // Archivo CSS para estilos personalizados
import { Divider, Box } from "@mui/material";

interface DeleteProductProps {
  onCancel?: () => void;
  productId: number | undefined;
}

export const DeleteDialog: React.FC<DeleteProductProps> = ({
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
    <Dialog open={true} onClose={onCancel} className="delete-dialog">
      <DialogTitle className="delete-dialog-title">
        Confirmar eliminación
      </DialogTitle>
      <Divider />
      <DialogContent>
        <DialogContentText className="delete-dialog-content">
          ¿Estás seguro de que deseas eliminar este producto? Esta acción no se
          puede deshacer.
        </DialogContentText>
      </DialogContent>
      <Divider />
      <DialogActions className="delete-dialog-actions">
        <Box display="flex" justifyContent="flex-end" width="100%" gap={2}>
          <Button
            onClick={onCancel}
            className="cancel-button"
            variant="outlined"
          >
            Cancelar
          </Button>
          <Button
            onClick={handleDeleteProduct}
            className="delete-button"
            color="error"
            variant="contained"
          >
            Eliminar
          </Button>
        </Box>
      </DialogActions>
    </Dialog>
  );
};
