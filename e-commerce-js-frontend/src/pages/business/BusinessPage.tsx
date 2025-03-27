import { Button, Box, Typography, Modal, Divider } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import "./business.css";
import { useState } from "react";
import BusinessForm from "./components/form/FormComponent";
import { BusinessTable } from "./components/TableComponent";
import { BusinessProvider } from "./context/BusinessContext";

const BusinessPage: React.FC = () => {
  const [openModal, setOpenModal] = useState<boolean>(false);

  const currentBusiness = null;

  const handleCloseModal = (
    _event: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason !== "backdropClick") {
      setOpenModal(false);
    }
  };

  return (
    <BusinessProvider>
      <div className="business-container">
        <div className="business-header">
          <Typography variant="h5" className="business-title">
            Gestión de Negocios
          </Typography>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            className="business-add-button"
            onClick={() => setOpenModal(true)}
          >
            Añadir Negocio
          </Button>
        </div>

        <BusinessTable />

        <Modal
          open={openModal}
          onClose={handleCloseModal}
          aria-labelledby="modal-business"
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
            <Typography variant="h6" className="business-modal-title">
              {currentBusiness ? "Editar Negocio" : "Añadir Nuevo Negocio"}
            </Typography>
            <div className="mt-2 mb-4">
              <Divider />
            </div>
            <BusinessForm onCancel={() => handleCloseModal(new Event("click"))} />
          </Box>
        </Modal>
      </div>
    </BusinessProvider>
  );
};

export default BusinessPage;
