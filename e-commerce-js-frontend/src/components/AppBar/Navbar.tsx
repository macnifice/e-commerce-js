import React, { useState, useEffect } from "react";
import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Typography,
  Menu,
  Container,
  Avatar,
  Button,
  Tooltip,
  MenuItem,
  Drawer,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Divider,
  InputBase,
  Badge,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { styled, alpha } from "@mui/material/styles";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import HomeIcon from "@mui/icons-material/Home";
import BusinessIcon from "@mui/icons-material/Business";
import InventoryIcon from "@mui/icons-material/Inventory";
import LogoutIcon from "@mui/icons-material/Logout";
import HistoryIcon from "@mui/icons-material/History";
import CloseIcon from "@mui/icons-material/Close";
import { Link, useNavigate } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "../../hooks/hook";
import { loginSuccess, logout } from "../../redux/states/authSlice";

// Tipos para nuestro componente
interface NavLink {
  name: string;
  path: string;
  icon: React.ReactNode;
}

interface UserMenuItem {
  name: string;
  icon: React.ReactNode;
  action: () => void;
}

// Paleta personalizada para una tienda de ropa
const NavbarAppBar = styled(AppBar)({
  backgroundColor: "#212121", // Gris muy oscuro, casi negro
  color: "#fff",
  boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
});

// Estilos para el buscador
const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: "4px",
  backgroundColor: alpha("#ffffff", 0.1),
  "&:hover": {
    backgroundColor: alpha("#ffffff", 0.15),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "auto",
  },
  transition: "all 0.3s",
  border: "1px solid rgba(255,255,255,0.1)",
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  color: "rgba(255,255,255,0.7)",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "#ffffff",
  width: "100%",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
      "&:focus": {
        width: "30ch",
      },
    },
  },
}));

const StyledBadge = styled(Badge)({
  "& .MuiBadge-badge": {
    right: -3,
    top: 0,
    border: `2px solid #212121`,
    padding: "0 4px",
    backgroundColor: "#f06292", // Rosa para el badge del carrito
  },
});

const NavbarLogo = styled(Typography)({
  fontFamily: '"Playfair Display", serif',
  letterSpacing: "1px",
  fontWeight: 600,
});

const Navbar = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const { isAuthenticated, user } = useAppSelector((state) => state.auth);

  useEffect(() => {
    if (!isAuthenticated) {
      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        const parsedUser = JSON.parse(storedUser);
        dispatch(
          loginSuccess({
            isAuthenticated: true,
            user: parsedUser,
          })
        );
      }
    }
  }, [isAuthenticated, user, dispatch]);

  const getNavLinks = (): NavLink[] => {
    const baseLinks: NavLink[] = [
      { name: "Home", path: "/", icon: <HomeIcon /> },
    ];

    if (user?.role === "admin") {
      return [
        ...baseLinks,
        { name: "Business", path: "/business", icon: <BusinessIcon /> },
      ];
    } else if (user?.role === "business") {
      return [
        ...baseLinks,
        { name: "Products", path: "/products", icon: <InventoryIcon /> },
        { name: "Orders", path: "/orders", icon: <HistoryIcon /> },
      ];
    }

    return baseLinks; // Para customer y usuarios no autenticados
  };

  // Configurar opciones de menú de usuario según rol
  const getUserMenuItems = (): UserMenuItem[] => {
    const handleLogout = () => {
      dispatch(logout());
      localStorage.removeItem("user");
      localStorage.removeItem("token");
      navigate("/login");
    };

    const baseItems: UserMenuItem[] = [
      { name: "Logout", icon: <LogoutIcon />, action: handleLogout },
    ];

    if (user?.role === "customer") {
      return [
        {
          name: "Historial de pedidos",
          icon: <HistoryIcon />,
          action: () => navigate("/orders-history"),
        },
        ...baseItems,
      ];
    }

    return baseItems;
  };

  const navLinks = getNavLinks();
  const userMenuItems = getUserMenuItems();

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const toggleDrawer = (open: boolean) => () => {
    setDrawerOpen(open);
  };

  const cartItems = useAppSelector((state) => state.cart.items);
  const renderCart = () => {
    if (user?.role === "customer" || user === null) {
      const itemCount = cartItems.reduce(
        (count, item) => count + item.quantity,
        0
      );

      return (
        <IconButton color="inherit" component={Link} to="/cart" sx={{ mx: 2 }}>
          <StyledBadge badgeContent={itemCount} color="error">
            <ShoppingCartIcon />
          </StyledBadge>
        </IconButton>
      );
    }
  };

  const renderSearch = () => {
    if (isAuthenticated && user?.role === "customer") {
      return (
        <Search>
          <SearchIconWrapper>
            <SearchIcon />
          </SearchIconWrapper>
          <StyledInputBase
            placeholder="Buscar productos..."
            inputProps={{ "aria-label": "buscar" }}
          />
        </Search>
      );
    }
    return null;
  };

  const renderLoginButton = () => {
    if (!isAuthenticated) {
      return (
        <Button
          component={Link}
          to="/login"
          variant="outlined"
          color="inherit"
          sx={{
            borderColor: "rgba(255,255,255,0.3)",
            borderRadius: "2px",
            textTransform: "none",
            padding: "8px 16px",
            fontWeight: 500,
            letterSpacing: "0.5px",
            "&:hover": {
              borderColor: "rgba(255,255,255,0.8)",
              backgroundColor: "rgba(255,255,255,0.08)",
            },
          }}
        >
          Iniciar Sesión
        </Button>
      );
    }
    return null;
  };

  // Contenido del drawer para móviles
  const drawerContent = (
    <Box
      sx={{ width: 280, bgcolor: "#212121", color: "white", height: "100%" }}
      role="presentation"
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          p: 2,
        }}
      >
        <NavbarLogo variant="h6">FASHION</NavbarLogo>
        <IconButton onClick={toggleDrawer(false)} sx={{ color: "white" }}>
          <CloseIcon />
        </IconButton>
      </Box>
      <Divider sx={{ bgcolor: "rgba(255,255,255,0.1)" }} />

      {isAuthenticated && (
        <>
          <Box sx={{ p: 2, display: "flex", alignItems: "center" }}>
            <Avatar sx={{ mr: 2, bgcolor: "#f06292" }}>
              {user?.name?.charAt(0).toUpperCase()}
            </Avatar>
            <Box>
              <Typography variant="subtitle1">{user?.name}</Typography>
              <Typography
                variant="body2"
                sx={{ color: "rgba(255,255,255,0.7)" }}
              >
                {(user?.role ?? "").charAt(0).toUpperCase() +
                  (user?.role ?? "").slice(1)}
              </Typography>
            </Box>
          </Box>
          <Divider sx={{ bgcolor: "rgba(255,255,255,0.1)" }} />
        </>
      )}

      <List>
        {navLinks.map((link) => (
          <ListItem
            key={link.name}
            component={Link}
            to={link.path}
            onClick={toggleDrawer(false)}
            sx={{ color: "white" }}
          >
            <ListItemIcon sx={{ color: "rgba(255,255,255,0.7)" }}>
              {link.icon}
            </ListItemIcon>
            <ListItemText primary={link.name} />
          </ListItem>
        ))}
      </List>

      {isAuthenticated && (
        <>
          <Divider sx={{ bgcolor: "rgba(255,255,255,0.1)" }} />
          <List>
            {userMenuItems.map((item) => (
              <ListItem
                key={item.name}
                onClick={() => {
                  item.action();
                  setDrawerOpen(false);
                }}
                sx={{ color: "white" }}
              >
                <ListItemIcon sx={{ color: "rgba(255,255,255,0.7)" }}>
                  {item.icon}
                </ListItemIcon>
                <ListItemText primary={item.name} />
              </ListItem>
            ))}
          </List>
        </>
      )}

      {!isAuthenticated && (
        <>
          <Divider sx={{ bgcolor: "rgba(255,255,255,0.1)" }} />
          <Box sx={{ p: 2 }}>
            <Button
              fullWidth
              component={Link}
              to="/login"
              variant="outlined"
              color="inherit"
              sx={{
                borderColor: "rgba(255,255,255,0.3)",
                borderRadius: "2px",
                textTransform: "none",
                padding: "8px 16px",
                fontWeight: 500,
                letterSpacing: "0.5px",
                "&:hover": {
                  borderColor: "rgba(255,255,255,0.8)",
                  backgroundColor: "rgba(255,255,255,0.08)",
                },
              }}
              onClick={toggleDrawer(false)}
            >
              Iniciar Sesión
            </Button>
          </Box>
        </>
      )}
    </Box>
  );

  return (
    <NavbarAppBar position="sticky">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          {/* Ícono de menú para móviles */}
          {isMobile && (
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              onClick={toggleDrawer(true)}
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
          )}

          {/* Logo */}
          <Typography
            variant="h6"
            noWrap
            component={Link}
            to="/"
            sx={{
              mr: 2,
              fontFamily: '"Playfair Display", serif',
              letterSpacing: "1px",
              fontWeight: 600,
              color: "inherit",
              textDecoration: "none",
              flexGrow: { xs: 1, md: 0 },
            }}
          >
            FASHION
          </Typography>

          {/* Links de navegación para desktop */}
          {!isMobile && (
            <Box sx={{ flexGrow: 1, display: "flex", ml: 4 }}>
              {navLinks.map((link) => (
                <Button
                  key={link.name}
                  component={Link}
                  to={link.path}
                  startIcon={link.icon}
                  color="inherit"
                  sx={{
                    mr: 2,
                    textTransform: "none",
                    fontWeight: 400,
                    opacity: 0.9,
                    "&:hover": {
                      opacity: 1,
                      backgroundColor: "rgba(255,255,255,0.08)",
                    },
                  }}
                >
                  {link.name}
                </Button>
              ))}
            </Box>
          )}

          {/* Área derecha: Search, Cart, User o Auth */}
          <Box sx={{ display: "flex", alignItems: "center" }}>
            {!isMobile && renderSearch()}
            {!isMobile && renderCart()}

            {isAuthenticated ? (
              <Tooltip title="Abrir configuración">
                <IconButton onClick={handleOpenUserMenu} sx={{ ml: 2, p: 0 }}>
                  <Avatar sx={{ bgcolor: "#f06292" }}>
                    {user?.name?.charAt(0).toUpperCase()}
                  </Avatar>
                </IconButton>
              </Tooltip>
            ) : (
              !isMobile && renderLoginButton()
            )}

            {/* Menú de usuario */}
            <Menu
              sx={{
                mt: "45px",
                "& .MuiPaper-root": {
                  backgroundColor: "#212121",
                  color: "white",
                  boxShadow: "0 4px 20px rgba(0,0,0,0.15)",
                },
              }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {userMenuItems.map((item) => (
                <MenuItem
                  key={item.name}
                  onClick={() => {
                    item.action();
                    handleCloseUserMenu();
                  }}
                  sx={{
                    "&:hover": { backgroundColor: "rgba(255,255,255,0.08)" },
                  }}
                >
                  <ListItemIcon sx={{ color: "rgba(255,255,255,0.7)" }}>
                    {item.icon}
                  </ListItemIcon>
                  <Typography textAlign="center">{item.name}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>

      {/* Drawer para móviles */}
      <Drawer
        anchor="left"
        open={drawerOpen}
        onClose={toggleDrawer(false)}
        slotProps={{
          paper: {
            sx: {
              backgroundColor: "#212121",
              color: "white",
            },
          },
        }}
      >
        {drawerContent}
      </Drawer>
    </NavbarAppBar>
  );
};

export default Navbar;
