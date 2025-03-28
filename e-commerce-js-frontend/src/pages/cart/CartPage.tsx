import { useNavigate } from "react-router-dom";
import "./cart-page.css";
import { useAppDispatch, useAppSelector } from "../../hooks/hook";
import {
  clearCart,
  removeFromCart,
  updateQuantity,
} from "../../redux/states/cartSlice";
import { showSnackbar } from "../../redux/states/snackbarSlice";
import { CreatePurchaseOrder } from "../../models/cart.interface";
import { createPurchaseOrder } from "./services/purchaseOrderService";

const CartPage = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const cartItems = useAppSelector((state) => state.cart.items);
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);
  const user = useAppSelector((state) => state.auth.user);

  const handleQuantityChange = (id: string, newQuantity: number) => {
    if (newQuantity < 1) return;

    dispatch(updateQuantity({ id, quantity: newQuantity }));
  };

  const handleRemoveItem = (id: string) => {
    dispatch(removeFromCart(id));
  };

  const calculateSubtotal = () => {
    return cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  };

  const subtotal = calculateSubtotal() / 1.16;
  const IVA = subtotal * 0.16;
  const total = subtotal + IVA;

  const handleCreateCart = async () => {
    if (isAuthenticated) {
      const purchaseOrder: CreatePurchaseOrder = {
        total: total,
        iva: IVA,
        subtotal: subtotal,
        userId: user?.id || 0,
        statusId: 1,
        products: cartItems.map((item) => ({
          id: Number(item.id),
          quantity: item.quantity,
          price: item.price,
          businessId: item.businessId,
        })),
      };

      const response = await createPurchaseOrder(purchaseOrder);
      if (response.status === 201) {
        dispatch(clearCart());
        dispatch(
          showSnackbar({
            message: "Carrito creado correctamente",
            severity: "success",
          })
        );
      }
    } else {
      dispatch(
        showSnackbar({
          message: "Debes estar autenticado para crear un carrito",
          severity: "error",
        })
      );
      navigate("/login");
    }
  };

  const handleClearCart = () => {
    dispatch(clearCart());
  };

  return (
    <div className="cart-container">
      {cartItems.length === 0 ? (
        <div className="empty-cart-card">
          {/* Header */}
          <div className="empty-cart-header">
            <h2 className="empty-cart-title">E-Commerce JS</h2>
          </div>

          {/* Body */}
          <div className="empty-cart-body">
            <svg
              className="empty-cart-icon"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
              />
            </svg>
            <h2 className="empty-cart-subtitle">Tu carrito está vacío</h2>
            <p className="empty-cart-text">
              Parece que aún no has añadido ningún producto a tu carrito.
              ¡Explora nuestra tienda y descubre productos increíbles!
            </p>
            <button
              className="continue-shopping-button"
              onClick={() => navigate("/")}
            >
              Ir a la tienda
            </button>
          </div>

          {/* Footer */}
          <div className="empty-cart-footer">
            <p>
              © {new Date().getFullYear()} E-Commerce JS. Todos los derechos
              reservados.
            </p>
          </div>
        </div>
      ) : (
        <div className="cart-grid">
          <div className="cart-items-container">
            <div className="cart-header">
              <h2 className="cart-header-title">Productos en tu carrito</h2>
            </div>

            <ul className="cart-items-list">
              {cartItems.map((item) => (
                <li key={item.id} className="cart-item">
                  <img
                    src={item.image || "https://via.placeholder.com/150"}
                    alt={item.name}
                    className="cart-item-image"
                  />
                  <div className="cart-item-details">
                    <h3 className="cart-item-name">{item.name}</h3>
                    <span className="cart-item-price">
                      ${item.price.toFixed(2)}
                    </span>
                    <div className="cart-item-actions">
                      <div className="cart-item-quantity">
                        <button
                          className="quantity-button"
                          onClick={() =>
                            handleQuantityChange(item.id, item.quantity - 1)
                          }
                        >
                          -
                        </button>
                        <span className="quantity-value">{item.quantity}</span>
                        <button
                          className="quantity-button"
                          onClick={() =>
                            handleQuantityChange(item.id, item.quantity + 1)
                          }
                          disabled={item.quantity >= item.stock}
                        >
                          +
                        </button>
                      </div>
                      <button
                        className="remove-button"
                        onClick={() => handleRemoveItem(item.id)}
                      >
                        Eliminar
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>

            <div className="cart-footer">
              Los precios y la disponibilidad pueden cambiar.
            </div>
          </div>

          <div className="cart-summary">
            <div className="summary-header">
              <h2 className="summary-header-title">Resumen del pedido</h2>
            </div>
            <div className="summary-body">
              <div className="summary-row">
                <span>Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="summary-row">
                <span>IVA</span>
                <span>${IVA.toFixed(2)}</span>
              </div>
              <div className="summary-row">
                <span>Envío</span>
                <span>Free</span>
              </div>
              <div className="summary-row summary-total">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>

              <button onClick={handleCreateCart} className="checkout-button">
                Crear carrito
              </button>

              <button
                onClick={() => navigate("/")}
                className="continue-cart-button"
              >
                Seguir comprando
              </button>
              <button onClick={handleClearCart} className="clear-cart-button">
                Vaciar carrito
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;
