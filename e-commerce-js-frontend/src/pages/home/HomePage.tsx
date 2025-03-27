import { useEffect, useState } from "react";
import { getProducts } from "./service/productService";
import "./home-page.css";
import { useAppDispatch } from "../../hooks/hook";
import { addToCart } from "../../redux/states/cartSlice";
// import { useNavigate } from "react-router-dom";

interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  stock: number;
  image?: string;
}

const HomePage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const dispatch = useAppDispatch();
  // const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      const response = await getProducts();
      if (Array.isArray(response.data)) {
        setProducts(response.data);
      } else {
        setProducts([]);
      }
    };
    fetchProducts();
  }, []);

  const handleAddToCart = (product: Product) => {
    if (product.stock > 0) {
      dispatch(
        addToCart({
          id: product.id,
          name: product.name,
          price: product.price,
          image: product.image,
          stock: product.stock,
          description: product.description,
        })
      );

      // Opcional: mostrar notificación o abrir el carrito
      // También podrías usar tu sistema de notificaciones aquí
    }
  };

  return (
    <div className="home-container">
      <h1 className="home-title">Bienvenido a nuestra tienda online</h1>

      {products.length === 0 ? (
        <div className="empty-products-card">
          {/* Header */}
          <div className="empty-products-header">
            <h2 className="empty-products-title">E-Commerce JS</h2>
          </div>

          {/* Body */}
          <div className="empty-products-body">
            <svg
              className="empty-products-icon"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
              />
            </svg>
            <h2 className="empty-products-subtitle">
              No hay productos disponibles
            </h2>
            <p className="empty-products-text">
              Estamos trabajando para añadir nuevos productos a nuestra tienda.
              ¡Vuelve a visitarnos pronto para descubrir nuestra colección!
            </p>
          </div>

          {/* Footer */}
          <div className="empty-products-footer">
            <p className="empty-products-footer-text">
              Mientras tanto, puedes explorar nuestras categorías o contactar
              con nosotros.
            </p>
            <p className="empty-products-copyright">
              © {new Date().getFullYear()} E-Commerce JS. Todos los derechos
              reservados.
            </p>
          </div>
        </div>
      ) : (
        <div className="products-grid">
          {products.map((product) => (
            <div key={product.id} className="product-card">
              <div className="product-image-container">
                {product.image && (
                  <img
                    src={product.image}
                    alt={product.name}
                    className="product-image"
                  />
                )}
              </div>
              <div className="product-content">
                <h2 className="product-name">{product.name}</h2>
                <p className="product-price">${product.price.toFixed(2)}</p>

                <p className="product-description">
                  {product.description
                    ? product.description.length > 100
                      ? `${product.description.substring(0, 100)}...`
                      : product.description
                    : "Sin descripción disponible"}
                </p>

                <div className="product-stock">
                  <span>
                    Stock:{" "}
                    <span className="product-stock-value">{product.stock}</span>
                  </span>
                </div>

                <div className="product-actions">
                  <button
                    className="add-to-cart-button"
                    onClick={() => handleAddToCart(product)}
                    disabled={product.stock <= 0}
                  >
                    {product.stock > 0 ? "Añadir al carrito" : "Agotado"}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default HomePage;
