import React from "react";
import { Box, Container, Typography } from "@mui/material";
import CustomerOrderTable from "./components/CustomerOrderTable";

const OrdersCustomerPage: React.FC = () => {
  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Mis Órdenes
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Aquí puedes ver y gestionar tus órdenes
        </Typography>
      </Box>
      <CustomerOrderTable />
    </Container>
  );
};

export default OrdersCustomerPage; 