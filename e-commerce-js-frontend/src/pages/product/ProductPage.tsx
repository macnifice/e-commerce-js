import { Button, Box, Typography, Modal, Divider, Dialog } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import ProductTable from "./components/table/TableComponent";
import ProductForm from "./components/form/FormComponent";
import { ProductProvider } from "./context/ProductContex";
import { useState } from "react";
import { Product } from "../../models/product.interface";
import { DeleteDialog } from "./components/dialog/DeleteProductDialgoComponent";

const ProductPage: React.FC = () => {
  const [editMode, setEditMode] = useState<boolean>(false);
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [product, setProduct] = useState<Product>();
  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const [selectedProductId, setSelectedProductId] = useState<
    number | undefined
  >(undefined);

  const handleOpenModal = async (product?: Product) => {
    if (product) {
      setProduct(product);
      setEditMode(true);
    }
    setOpenModal(true);
  };

  const handleCloseModal = (
    _event: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason !== "backdropClick") {
      setOpenModal(false);
      setEditMode(false);
    }
  };

  const handleConfirmDialog = (id: number) => {
    setSelectedProductId(id);
    setOpenDialog(true);
  };

  const handleClosDialog = () => {
    setOpenDialog(false);
    setSelectedProductId(undefined);
  };
  return (
    <ProductProvider>
      <div className="business-container">
        <div className="business-header">
          <Typography variant="h5" className="business-title">
            Gestión de Productos
          </Typography>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            className="business-add-button"
            onClick={() => handleOpenModal}
          >
            Añadir Producto
          </Button>
        </div>

        <ProductTable
          onEditProduct={handleOpenModal}
          onDeleteDialog={handleConfirmDialog}
        />

        <Modal
          open={openModal}
          onClose={handleCloseModal}
          aria-labelledby="modal-product"
        >
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: 400,
              bgcolor: "background.paper",
              boxShadow: 24,
              p: 4,
              borderRadius: 2,
            }}
          >
            <Typography variant="h6" className="product-modal-title">
              {editMode ? "Editar Producto" : "Añadir Nuevo Producto"}
            </Typography>
            <div className="mt-2 mb-4">
              <Divider />
            </div>
            <ProductForm
              isEditing={editMode}
              initialValue={product}
              onCancel={() => handleCloseModal(new Event("click"))}
            />
          </Box>
        </Modal>

        <Box>
          <Dialog
            open={openDialog}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DeleteDialog
              productId={selectedProductId}
              onCancel={handleClosDialog}
            />
          </Dialog>
        </Box>
      </div>
    </ProductProvider>
  );
};

export default ProductPage;
