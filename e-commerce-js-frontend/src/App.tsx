import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/AppBar/Navbar";
import HomePage from "./pages/home/HomePage";
import LoginPage from "./pages/login/LoginPage";
import RegisterPage from "./pages/register/RegisterPage";
import VerifyAccount from "./pages/verify-account/VerifyAccount";
import GlobalSnackbar from "./components/snackBar/SnackBar";
import BusinessPage from "./pages/business/BusinessPage";
import UnauthorizedPage from "./pages/unauthorized/UnauthorizedPage";
import AuthGuard from "./components/guards/AuthGuard";
import RoleGuard from "./components/guards/RoleGuard";
import ProductPage from "./pages/product/ProductPage";
import CartPage from "./pages/cart/CartPage";
import OrdersPage from "./pages/orders/OrdersPage";
import OrdersCustomerPage from "./pages/orders-customer/OrdersCustomerPage";
import { useAppDispatch, useAppSelector } from "./hooks/hook";
import { useEffect } from "react";
import { loginSuccess, setAuthLoaded } from "./redux/states/authSlice";

function App() {
  const { isAuthenticated, user, isLoading } = useAppSelector(
    (state) => state.auth
  );
  const dispatch = useAppDispatch();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      dispatch(
        loginSuccess({
          isAuthenticated: true,
          user: parsedUser,
          isLoading: true,
        })
      );
    }
    dispatch(setAuthLoaded());
  }, [dispatch]);
  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <Navbar isAuthenticated={isAuthenticated} user={user} />
        <main className="container mx-auto py-4 px-2">
          <Routes>
            {/* Rutas públicas */}
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/verify-account/:id" element={<VerifyAccount />} />
            <Route path="/unauthorized" element={<UnauthorizedPage />} />
            <Route path="/cart" element={<CartPage />} />

            {/* Rutas protegidas solo por autenticación */}
            <Route
              path="/orders-history"
              element={
                <AuthGuard
                  isAuthenticated={isAuthenticated}
                  isLoading={isLoading}
                >
                  <OrdersCustomerPage />
                </AuthGuard>
              }
            />

            {/* Rutas protegidas por autenticación y rol */}
            <Route
              path="/products"
              element={
                <RoleGuard
                  isAuthenticated={isAuthenticated}
                  user={user}
                  isLoading={isLoading}
                  allowedRoles={["business"]}
                >
                  <ProductPage />
                </RoleGuard>
              }
            />
            <Route
              path="/orders"
              element={
                <RoleGuard
                  isAuthenticated={isAuthenticated}
                  user={user}
                  isLoading={isLoading}
                  allowedRoles={["business"]}
                >
                  <OrdersPage />
                </RoleGuard>
              }
            />
            {/* Rutas solo para admin */}
            <Route
              path="/business"
              element={
                <RoleGuard
                  isAuthenticated={isAuthenticated}
                  user={user}
                  isLoading={isLoading}
                  allowedRoles={["admin"]}
                >
                  <BusinessPage />
                </RoleGuard>
              }
            />
          </Routes>
        </main>
        <GlobalSnackbar />
      </div>
    </Router>
  );
}

export default App;
