import { useNavigate } from "react-router-dom";
import { Button, Container, Typography, Box, Paper } from "@mui/material";
import ErrorIcon from "@mui/icons-material/Error";

const UnauthorizedPage = () => {
  const navigate = useNavigate();

  return (
    <Container maxWidth="sm" sx={{ my: 4 }}>
      <Paper
        elevation={4}
        sx={{
          overflow: "hidden",
          borderRadius: 2,
          boxShadow: "0 8px 16px rgba(0, 0, 0, 0.1)",
        }}
      >
        {/* Header */}
        <Box
          sx={{
            bgcolor: "#212121",
            color: "white",
            p: 2.5,
            textAlign: "center",
          }}
        >
          <Typography variant="h5" fontWeight="bold">
            E-Commerce JS
          </Typography>
        </Box>

        {/* Body */}
        <Box
          sx={{
            p: 4,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            textAlign: "center",
          }}
        >
          <ErrorIcon sx={{ fontSize: 80, color: "#f44336", mb: 2 }} />

          <Typography
            variant="h4"
            component="h1"
            gutterBottom
            fontWeight="medium"
          >
            Acceso Denegado
          </Typography>

          <Typography
            variant="body1"
            sx={{ mb: 3, color: "#666", lineHeight: 1.6 }}
          >
            No tienes los permisos necesarios para acceder a esta página. Si
            crees que esto es un error, por favor contacta al administrador.
          </Typography>

          <Box sx={{ mt: 2 }}>
            <Button
              variant="contained"
              sx={{
                mr: 2,
                bgcolor: "#f06292",
                "&:hover": { bgcolor: "#ec407a" },
                textTransform: "none",
                px: 3,
                py: 1,
              }}
              onClick={() => navigate("/")}
            >
              Ir al inicio
            </Button>
            <Button
              variant="outlined"
              sx={{
                borderColor: "#f06292",
                color: "#f06292",
                "&:hover": {
                  borderColor: "#ec407a",
                  bgcolor: "rgba(240, 98, 146, 0.04)",
                },
                textTransform: "none",
                px: 3,
                py: 1,
              }}
              onClick={() => navigate(-1)}
            >
              Volver
            </Button>
          </Box>
        </Box>

        {/* Footer */}
        <Box
          sx={{
            p: 2,
            bgcolor: "#f9f9f9",
            borderTop: "1px solid #eee",
            textAlign: "center",
          }}
        >
          <Typography variant="body2" sx={{ mb: 1, color: "#666" }}>
            Si necesitas acceso a esta sección, solicítalo a través de la
            plataforma.
          </Typography>
          <Typography variant="caption" sx={{ color: "#999" }}>
            © {new Date().getFullYear()} E-Commerce JS. Todos los derechos
            reservados.
          </Typography>
        </Box>
      </Paper>
    </Container>
  );
};

export default UnauthorizedPage;
