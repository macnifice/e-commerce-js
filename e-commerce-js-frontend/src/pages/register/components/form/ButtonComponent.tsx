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
        className="register-button"
      >
        {isLoading ? "Registrando..." : "Registrarse"}
      </button>

      <div className="register-login-link">
        ¿Ya tienes una cuenta?{" "}
        <Link to="/login">
          Inicia sesión
        </Link>
      </div>
    </>
  );
}

export default ButtonComponent;
