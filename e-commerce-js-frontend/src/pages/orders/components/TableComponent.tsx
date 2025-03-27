import React, { useEffect, useState } from "react";
import { Box, Pagination, PaginationItem, Paper } from "@mui/material";
import { AssignmentReturn } from "@mui/icons-material";
import {
  DataGrid,
  GridActionsCellItem,
  GridColDef,
  gridPageCountSelector,
  gridPageSelector,
  GridToolbarQuickFilter,
  useGridApiContext,
  useGridSelector,
} from "@mui/x-data-grid";
import {
  getOrdersByBusinessId,
  updateOrderStatus,
} from "../services/orderService";
import { useAppDispatch, useAppSelector } from "../../../hooks/hook";
import "../orders.css";
import {
  CustomerOrderResponse,
  OrderBusinessItemResponse,
  OrderStatus,
} from "../../../models/orders.interface";
import { showSnackbar } from "../../../redux/states/snackbarSlice";

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

const PAGE_SIZE = 10;

const OrdersTable: React.FC = () => {
  const [paginationModel, setPaginationModel] = useState({
    pageSize: PAGE_SIZE,
    page: 0,
  });
  const user = useAppSelector((state) => state.auth.user);
  const dispatch = useAppDispatch();
  const [orders, setOrders] = useState<OrderBusinessItemResponse[]>([]);

  const getRowClassName = (params: { row: OrderBusinessItemResponse }) => {
    const status = params.row.purchaseOrder?.statusId;
    if (status === OrderStatus.POR_PAGAR) return "order-pending";
    if (status === OrderStatus.PAGADA) return "order-paid";
    if (status === OrderStatus.DEVUELTA) return "order-returned";
    if (status === OrderStatus.CANCELADA) return "order-cancelled";
    return "";
  };

  const handleReturnOrder = async (id: string) => {
    const order = orders.find((order) => Number(order.id) === Number(id));
    const response = await updateOrderStatus(id, OrderStatus.DEVUELTA);
    if (response.status === 200) {
      if (order) {
        order.purchaseOrder.statusId = OrderStatus.DEVUELTA;
        setOrders([...orders, order]);
      }
      dispatch(
        showSnackbar({
          message: "Orden devuelta correctamente",
          severity: "success",
        })
      );
    } else {
      dispatch(
        showSnackbar({
          message: "Error al devolver la orden",
          severity: "error",
        })
      );
    }
  };

  useEffect(() => {
    if (user) {
      getOrdersByBusinessId(user.id.toString()).then(
        (response: CustomerOrderResponse) => {
          if (Array.isArray(response.data)) {
            setOrders(response.data);
          } else {
            setOrders([]);
          }
        }
      );
    }
  }, [user]);

  const columns: GridColDef[] = [
    {
      field: "createdAt",
      headerName: "Fecha",
      flex: 1,
      minWidth: 200,
      renderCell: (params) => {
        return new Date(params.value).toLocaleString("es-MX");
      },
    },
    {
      field: "purchaseOrder.user",
      headerName: "Cliente",
      flex: 1,
      minWidth: 200,
      renderCell: (params) => {
        const user = params.row.purchaseOrder?.user;
        return user ? `${user.name} - (${user.email})` : "Sin cliente";
      },
    },
    {
      field: "product.name",
      headerName: "Producto",
      flex: 1,
      minWidth: 150,
      renderCell: (params) => {
        return params.row.product?.name || "Sin producto";
      },
    },
    {
      field: "price",
      headerName: "Precio",
      flex: 1,
      minWidth: 100,
      renderCell: (params) => {
        return params.value.toLocaleString("es-MX", {
          style: "currency",
          currency: "MXN",
        });
      },
    },
    {
      field: "purchaseOrder.statusId",
      headerName: "Estado",
      flex: 1,
      minWidth: 120,
      renderCell: (params) => {
        const status = params.row.purchaseOrder?.statusId;
        switch (status) {
          case 1:
            return "Por pagar";
          case 2:
            return "Pagada";
          case 3:
            return "Devuelta";
          case 4:
            return "Cancelada";
          default:
            return "Desconocido";
        }
      },
    },
    {
      field: "actions",
      type: "actions",
      headerName: "Acciones",
      width: 150,
      cellClassName: "actions",
      getActions: ({ id, row }) => {
        if (row.purchaseOrder?.statusId === OrderStatus.PAGADA) {
          return [
            <GridActionsCellItem
              icon={<AssignmentReturn />}
              label="Devolver"
              onClick={() => handleReturnOrder(id.toString())}
              color="primary"
              showInMenu={false}
            />,
          ];
        }
        return [];
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
        initialState={{
          sorting: {
            sortModel: [{ field: "statusId", sort: "desc" }],
          },
        }}
        getRowClassName={getRowClassName}
        sx={{
          border: 0,
          "& .order-pending": {
            backgroundColor: "rgba(255, 193, 7, 0.15)",
            "&:hover": {
              backgroundColor: "rgba(255, 193, 7, 0.25)",
            },
          },
          "& .order-paid": {
            backgroundColor: "rgba(46, 125, 50, 0.15)",
            "&:hover": {
              backgroundColor: "rgba(46, 125, 50, 0.25)",
            },
          },
          "& .order-returned": {
            backgroundColor: "rgba(255, 193, 7, 0.15)",
            "&:hover": {
              backgroundColor: "rgba(255, 193, 7, 0.25)",
            },
          },
          "& .order-cancelled": {
            backgroundColor: "rgba(211, 47, 47, 0.15)",
            "&:hover": {
              backgroundColor: "rgba(211, 47, 47, 0.25)",
            },
          },
        }}
      />
    </Paper>
  );
};

export default OrdersTable;
