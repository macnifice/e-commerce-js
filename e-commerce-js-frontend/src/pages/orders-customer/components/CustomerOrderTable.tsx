import React, { useEffect } from "react";
import { Box, Pagination, PaginationItem, Paper } from "@mui/material";
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
import { CreditCard, Cancel } from "@mui/icons-material";
import {
  getOrdersByCustomerId,
  updateOrderStatus,
} from "../services/customerOrderService";
import {
  CustomerOrderResponse,
  OrderStatus,
  PurchaseOrder,
} from "../../../models/orders.interface";
import { useAppDispatch, useAppSelector } from "../../../hooks/hook";
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

export const CustomerOrderTable: React.FC = () => {
  const [paginationModel, setPaginationModel] = React.useState({
    pageSize: PAGE_SIZE,
    page: 0,
  });
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.auth.user);
  const [orders, setOrders] = React.useState<PurchaseOrder[]>([]);

  useEffect(() => {
    if (user) {
      getOrdersByCustomerId(user.id.toString()).then(
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

  const getRowClassName = (params: { row: PurchaseOrder }) => {
    const status = params.row.statusId;
    if (status === OrderStatus.POR_PAGAR) return "order-pending";
    if (status === OrderStatus.PAGADA) return "order-paid";
    if (status === OrderStatus.DEVUELTA) return "order-returned";
    if (status === OrderStatus.CANCELADA) return "order-cancelled";
    return "";
  };

  const handlePayOrder = async (id: string) => {
    const order = orders.find((order) => Number(order.id) === Number(id));

    const resp = await updateOrderStatus(id, OrderStatus.PAGADA);
    if (resp.status === 200) {
      if (order) {
        setOrders(
          orders.map((o) =>
            Number(o.id) === Number(id)
              ? { ...o, statusId: OrderStatus.PAGADA }
              : o
          )
        );
      }
      dispatch(
        showSnackbar({
          message: "Orden pagada correctamente",
          severity: "success",
        })
      );
    } else {
      dispatch(
        showSnackbar({
          message: "Error al pagar la orden",
          severity: "error",
        })
      );
    }
  };

  const handleCancelOrder = async (id: string) => {
    const order = orders.find((order) => Number(order.id) === Number(id));

    const resp = await updateOrderStatus(id, OrderStatus.CANCELADA);
    if (resp.status === 200) {
      if (order) {
        setOrders(
          orders.map((o) =>
            Number(o.id) === Number(id)
              ? { ...o, statusId: OrderStatus.CANCELADA }
              : o
          )
        );
      }
      dispatch(
        showSnackbar({
          message: "Orden cancelada correctamente",
          severity: "success",
        })
      );
    } else {
      dispatch(
        showSnackbar({
          message: "Error al cancelar la orden",
          severity: "error",
        })
      );
    }
  };

  const columns: GridColDef[] = [
    {
      field: "createdAt",
      headerName: "Fecha",
      flex: 1,
      minWidth: 100,
      renderCell(params) {
        return new Date(params.value).toLocaleString("es-MX");
      },
    },
    {
      field: "name",
      headerName: "Articulo",
      flex: 1,
      minWidth: 100,
    },
    {
      field: "quantity",
      headerName: "Cantidad",
      flex: 1,
      minWidth: 50,
    },
    {
      field: "price",
      headerName: "Precio",
      flex: 1,
      minWidth: 100,
      renderCell: (params) => {
        return params.value.toLocaleString("es-ES", {
          style: "currency",
          currency: "MXN",
        });
      },
    },
    {
      field: "total",
      headerName: "Total",
      flex: 1,
      minWidth: 120,
      renderCell: (params) => {
        return params.value.toLocaleString("es-ES", {
          style: "currency",
          currency: "MXN",
        });
      },
    },
    {
      field: "businessName",
      headerName: "Negocio",
      flex: 1,
      minWidth: 200,
    },
    {
      field: "statusId",
      headerName: "Estado",
      flex: 1,
      minWidth: 120,
      renderCell: (params) => {
        return params.value === 1
          ? "Por pagar"
          : params.value === 2
          ? "Pagada"
          : params.value === 3
          ? "Devuelta"
          : "Cancelada";
      },
    },
    {
      field: "actions",
      type: "actions",
      headerName: "Acciones",
      width: 150,
      cellClassName: "actions",
      getActions: ({ id, row }) => {
        if (row.statusId === OrderStatus.POR_PAGAR) {
          return [
            <GridActionsCellItem
              icon={<CreditCard />}
              label="Pagar"
              onClick={() => handlePayOrder(id.toString())}
              color="primary"
              showInMenu={false}
            />,
            <GridActionsCellItem
              icon={<Cancel />}
              label="Cancelar"
              onClick={() => handleCancelOrder(id.toString())}
              color="error"
              showInMenu={false}
            />,
          ];
        }
        return [];
      },
    },
  ];

  return (
    <>
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
          getRowClassName={getRowClassName}
          initialState={{
            sorting: {
              sortModel: [{ field: "createdAt", sort: "desc" }],
            },
          }}
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
              backgroundColor: "rgba(173, 216, 230, 0.15)",
              "&:hover": {
                backgroundColor: "rgba(173, 216, 230, 0.25)",
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
    </>
  );
};

export default CustomerOrderTable;
