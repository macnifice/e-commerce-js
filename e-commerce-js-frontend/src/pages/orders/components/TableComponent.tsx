import React, { useEffect, useState } from "react";
import {
  Box,
  Pagination,
  PaginationItem,
  Paper,
  Chip,
  IconButton,
  Tooltip,
} from "@mui/material";
import {
  DataGrid,
  GridColDef,
  gridPageCountSelector,
  gridPageSelector,
  GridToolbarQuickFilter,
  useGridApiContext,
  useGridSelector,
} from "@mui/x-data-grid";
import { Visibility, CheckCircle, Cancel } from "@mui/icons-material";
import {
  Order,
  OrderResponse,
  OrderStatus,
} from "../interfaces/order.interface";
import {
  getOrdersByBusinessId,
  updateOrderStatus,
} from "../services/orderService";
import { useAppSelector, useAppDispatch } from "../../../hooks/hook";
import { showSnackbar } from "../../../redux/states/snackbarSlice";
import "../orders.css";

function CustomPagination() {
  const apiRef = useGridApiContext();
  const page = useGridSelector(apiRef, gridPageSelector);
  const pageCount = useGridSelector(apiRef, gridPageCountSelector);

  return (
    <Pagination
      color="standard"
      variant="outlined"
      shape="rounded"
      page={page + 1}
      count={pageCount}
      renderItem={(props2) => <PaginationItem {...props2} />}
      onChange={(_event: React.ChangeEvent<unknown>, value: number) =>
        apiRef.current.setPage(value - 1)
      }
    />
  );
}

function QuickSearchToolbar() {
  return (
    <Box
      sx={{
        p: 1,
        pb: 0,
        display: "flex",
        alignItems: "center",
        gap: 1,
        backgroundColor: "#f5f5f5",
        borderRadius: "8px 8px 0 0",
        borderBottom: "1px solid #e0e0e0",
      }}
    >
      <GridToolbarQuickFilter
        sx={{
          "& .MuiInputBase-root": {
            backgroundColor: "#f0f0f0",
            borderRadius: "4px",
            "&:hover": {
              backgroundColor: "#fafafa",
            },
          },
        }}
        quickFilterParser={(searchInput: string) =>
          searchInput
            .split(",")
            .map((value) => value.trim())
            .filter((value) => value !== "")
        }
      />
    </Box>
  );
}

interface OrdersTableProps {
  onSelectOrder: (id: string) => void;
}

const PAGE_SIZE = 5;

const OrdersTable: React.FC<OrdersTableProps> = ({ onSelectOrder }) => {
  const [paginationModel, setPaginationModel] = useState({
    pageSize: PAGE_SIZE,
    page: 0,
  });
  const user = useAppSelector((state) => state.auth.user);
  const dispatch = useAppDispatch();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (user) {
      setLoading(true);
      getOrdersByBusinessId(user.id.toString()).then(
        (response: OrderResponse) => {
          if (response.success && Array.isArray(response.data)) {
            setOrders(response.data);
          } else {
            setOrders([]);
            dispatch(
              showSnackbar({
                message: response.message || "Error al cargar órdenes",
                severity: "error",
              })
            );
          }
          setLoading(false);
        }
      );
    }
  }, [user, dispatch]);

  const handleUpdateStatus = async (
    orderId: string,
    newStatus: OrderStatus
  ) => {
    try {
      const response = await updateOrderStatus(orderId, newStatus);

      if (response.success) {
        setOrders(
          orders.map((order) =>
            order.id === orderId ? { ...order, status: newStatus } : order
          )
        );

        dispatch(
          showSnackbar({
            message: "Estado de la orden actualizado correctamente",
            severity: "success",
          })
        );
      } else {
        dispatch(
          showSnackbar({
            message: response.message || "Error al actualizar el estado",
            severity: "error",
          })
        );
      }
    } catch (error) {
      console.error("Error al actualizar el estado de la orden:", error);
      dispatch(
        showSnackbar({
          message: "Error al actualizar el estado de la orden",
          severity: "error",
        })
      );
    }
  };

  //   const formatDate = (dateString: string) => {
  //     const date = new Date(dateString);
  //     return new Intl.DateTimeFormat("es-ES", {
  //       day: "2-digit",
  //       month: "2-digit",
  //       year: "numeric",
  //       hour: "2-digit",
  //       minute: "2-digit",
  //     }).format(date);
  //   };

  const renderStatus = (status: OrderStatus) => {
    let color: string = "";
    let label: string = "";

    switch (status) {
      case OrderStatus.PENDING:
        color = "warning";
        label = "Pendiente";
        break;
      case OrderStatus.PROCESSING:
        color = "info";
        label = "En proceso";
        break;
      case OrderStatus.COMPLETED:
        color = "success";
        label = "Completada";
        break;
      case OrderStatus.CANCELLED:
        color = "error";
        label = "Cancelada";
        break;
      default:
        color = "default";
        label = status;
    }

    return <Chip size="small" label={label} color={color as "warning" | "info" | "success" | "error" | "default"} />;
  };

  const columns: GridColDef[] = [
    {
      field: "id",
      headerName: "ID",
      width: 100,
    },
    {
      field: "customerName",
      headerName: "Cliente",
      flex: 1,
      minWidth: 150,
    },
    {
      field: "orderDate",
      headerName: "Fecha",
      flex: 1,
      minWidth: 150,
    },
    {
      field: "totalAmount",
      headerName: "Total",
      flex: 1,
      minWidth: 120,
    },
    {
      field: "status",
      headerName: "Estado",
      flex: 1,
      minWidth: 150,
      renderCell: (params) => renderStatus(params.value as OrderStatus),
    },
    {
      field: "actions",
      headerName: "Acciones",
      width: 150,
      renderCell: (params) => {
        const isCompleted = params.row.status === OrderStatus.COMPLETED;
        const isCancelled = params.row.status === OrderStatus.CANCELLED;

        return (
          <Box sx={{ display: "flex" }}>
            <Tooltip title="Ver detalles">
              <IconButton
                size="small"
                onClick={() => onSelectOrder(params.row.id)}
              >
                <Visibility fontSize="small" />
              </IconButton>
            </Tooltip>

            {!isCompleted && !isCancelled && (
              <Tooltip title="Marcar como completada">
                <IconButton
                  size="small"
                  color="success"
                  onClick={() =>
                    handleUpdateStatus(params.row.id, OrderStatus.COMPLETED)
                  }
                >
                  <CheckCircle fontSize="small" />
                </IconButton>
              </Tooltip>
            )}

            {!isCompleted && !isCancelled && (
              <Tooltip title="Cancelar orden">
                <IconButton
                  size="small"
                  color="error"
                  onClick={() =>
                    handleUpdateStatus(params.row.id, OrderStatus.CANCELLED)
                  }
                >
                  <Cancel fontSize="small" />
                </IconButton>
              </Tooltip>
            )}
          </Box>
        );
      },
    },
  ];

  return (
    <Paper sx={{ height: 500, width: "100%" }}>
      <DataGrid
        rows={orders}
        columns={columns}
        paginationModel={paginationModel}
        onPaginationModelChange={setPaginationModel}
        pageSizeOptions={[PAGE_SIZE]}
        disableColumnSelector
        disableDensitySelector
        slots={{ toolbar: QuickSearchToolbar, pagination: CustomPagination }}
        loading={loading}
        sx={{ border: 0 }}
      />
    </Paper>
  );
};

export default OrdersTable;
