import { Box, Typography, Divider } from "@mui/material";
import { useState } from "react";
import OrdersTable from "./components/TableComponent";
import "./orders.css";

const OrdersPage: React.FC = () => {
  const [selectedOrder, setSelectedOrder] = useState<string | null>(null);

  return (
    <div className="orders-container">
      <div className="orders-header">
        <Typography variant="h5" className="orders-title">
          Gestión de Pedidos
        </Typography>
      </div>

      <OrdersTable onSelectOrder={(id: string) => setSelectedOrder(id)} />

      {selectedOrder && (
        <Box
          sx={{
            mt: 3,
            p: 3,
            bgcolor: "background.paper",
            borderRadius: 2,
            boxShadow: 2,
          }}
        >
          <Typography variant="h6" className="order-detail-title">
            Detalles del Pedido #{selectedOrder}
          </Typography>
          <Divider sx={{ my: 2 }} />
          <Typography variant="body2" color="text.secondary">
            Aquí se mostrarían los detalles específicos del pedido seleccionado.
          </Typography>
        </Box>
      )}
    </div>
  );
};

export default OrdersPage; 