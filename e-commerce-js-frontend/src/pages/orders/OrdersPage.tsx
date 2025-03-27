import { Typography } from "@mui/material";
import OrdersTable from "./components/TableComponent";
import "./orders.css";

const OrdersPage: React.FC = () => {
  return (
    <div className="orders-container">
      <div className="orders-header">
        <Typography variant="h5" className="orders-title">
          Gestión de Pedidos
        </Typography>
      </div>

      <OrdersTable />
    </div>
  );
};

export default OrdersPage;
