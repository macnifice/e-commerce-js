import React, { useEffect } from "react";
import { Box, Pagination, PaginationItem, Paper, Typography, Stack } from "@mui/material";
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
import { Edit, Delete } from "@mui/icons-material";
import { Product, ProductResponse } from "../../../models/product.interface";
import { getProductByBusinessId } from "../services/procutService";
import { useAppSelector } from "../../../hooks/hook";
// import { getBusinesses } from "../services/businessService";

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

const PAGE_SIZE = 5;

export const ProductTable: React.FC = () => {
  const [paginationModel, setPaginationModel] = React.useState({
    pageSize: PAGE_SIZE,
    page: 0,
  });
  const user = useAppSelector((state) => state.auth.user);
  const [products, setProducts] = React.useState<Product[]>([]);

  // const handleDelete = (id: string) => {
  //   deleteProduct(id).then((response: ProductResponse) => {
  //     if (response.status === 200) {
  //       setProducts(products.filter((product) => product.id !== id));
  //     }
  //   });
  // };

  // const handleEdit = (id: string) => {};

  useEffect(() => {
    if (user) {
      getProductByBusinessId(user.id).then((response: ProductResponse) => {
        if (Array.isArray(response.data)) {
          setProducts(response.data);
        } else {
          setProducts([]);
        }
      });
    }
  }, [user]);

  // Función para determinar el color de la fila según el nivel de stock
  const getRowClassName = (params: { row: Product }) => {
    const stock = params.row.stock;
    if (stock <= 0) return "stock-agotado";
    if (stock <= 3) return "stock-bajo";
    if (stock <= 5) return "stock-medio";
    return "stock-normal";
  };

  const columns: GridColDef[] = [
    { field: "name", headerName: "Nombre", flex: 1, minWidth: 150 },
    { field: "price", headerName: "Precio", flex: 1, minWidth: 200 },
    { field: "stock", headerName: "Stock", flex: 1, minWidth: 200 },
    { field: "description", headerName: "Descripción", flex: 1, minWidth: 200 },
    {
      field: "actions",
      type: "actions",
      headerName: "Acciones",
      width: 100,
      cellClassName: "actions",
      getActions: ({ id }) => {
        return [
          <GridActionsCellItem
            icon={<Edit />}
            label="Edit"
            className="textPrimary"
            onClick={() => console.log(id)}
            color="inherit"
          />,
          <GridActionsCellItem
            icon={<Delete />}
            label="Delete"
            onClick={() => console.log(id)}
            color="inherit"
          />,
        ];
      },
    },
  ];

  return (
    <>
      <Box sx={{ mb: 2, p: 2, borderRadius: 1, bgcolor: "#f9f9f9" }}>
        <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 'bold' }}>Leyenda de inventario:</Typography>
        <Stack direction="row" spacing={3} flexWrap="wrap">
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Box sx={{ width: 16, height: 16, bgcolor: "rgba(46, 204, 113, 0.5)", mr: 1, borderRadius: 1 }} />
            <Typography variant="body2">Más de 5 productos</Typography>
          </Box>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Box sx={{ width: 16, height: 16, bgcolor: "rgba(241, 196, 15, 0.5)", mr: 1, borderRadius: 1 }} />
            <Typography variant="body2">5 productos restantes</Typography>
          </Box>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Box sx={{ width: 16, height: 16, bgcolor: "rgba(231, 76, 60, 0.5)", mr: 1, borderRadius: 1 }} />
            <Typography variant="body2">3 productos restantes</Typography>
          </Box>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Box sx={{ width: 16, height: 16, bgcolor: "rgba(142, 68, 173, 0.5)", mr: 1, borderRadius: 1 }} />
            <Typography variant="body2">Inventario agotado</Typography>
          </Box>
        </Stack>
      </Box>
      <Paper sx={{ height: 500, width: "100%" }}>
        <DataGrid
          rows={products}
          columns={columns}
          paginationModel={paginationModel}
          onPaginationModelChange={setPaginationModel}
          pageSizeOptions={[PAGE_SIZE]}
          disableColumnSelector
          disableDensitySelector
          slots={{ toolbar: QuickSearchToolbar, pagination: CustomPagination }}
          getRowClassName={getRowClassName}
          sx={{ 
            border: 0,
            // Estilos para las diferentes clases de stock
            "& .stock-normal": {
              backgroundColor: "rgba(46, 204, 113, 0.15)",
              "&:hover": {
                backgroundColor: "rgba(46, 204, 113, 0.25)",
              },
            },
            "& .stock-medio": {
              backgroundColor: "rgba(241, 196, 15, 0.15)",
              "&:hover": {
                backgroundColor: "rgba(241, 196, 15, 0.25)",
              },
            },
            "& .stock-bajo": {
              backgroundColor: "rgba(231, 76, 60, 0.15)",
              "&:hover": {
                backgroundColor: "rgba(231, 76, 60, 0.25)",
              },
            },
            "& .stock-agotado": {
              backgroundColor: "rgba(142, 68, 173, 0.15)",
              "&:hover": {
                backgroundColor: "rgba(142, 68, 173, 0.25)",
              },
            },
          }}
        />
      </Paper>
    </>
  );
};

export default ProductTable;
