import { Link } from "react-router-dom";

function ButtonComponent({
  isLoading,
  isValid,
}: {
  isLoading: boolean;
  isValid: boolean;
}) {
  return (
    <>
      <button
        type="submit"
        disabled={!isValid || isLoading}
        className="login-button"
      >
        {isLoading ? "Iniciando sesión..." : "Iniciar Sesión"}
      </button>
      <div className="login-register-link">
        ¿No tienes una cuenta?{" "}
        <Link to="/register">
          Regístrate
        </Link>
      </div>
    </>
  );
}

export default ButtonComponent;
