import { Button } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../hooks/hook";
import { verifyAccount } from "./services/verifyAccountService";
import { useParams } from "react-router-dom";
import { showSnackbar } from "../../redux/states/snackbarSlice";
import { verifyAccountSuccess } from "../../redux/states/authSlice";
import { User } from "../../models/user.interface";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import MarkEmailReadIcon from "@mui/icons-material/MarkEmailRead";
import "./verify-account.css";

const VerifyAccount = () => {
  const dispatch = useAppDispatch();
  const { id } = useParams();
  const userState = useAppSelector((state) => state.auth.user);

  const handleVerifyAccount = async () => {
    const response = await verifyAccount(id!.toString());

    if (response.status === 200) {
      dispatch(
        showSnackbar({
          message: "Cuenta verificada correctamente",
          severity: "success",
        })
      );

      dispatch(
        verifyAccountSuccess({
          isAuthenticated: false,
          user: {
            ...userState,
            isVerified: true,
          } as User,
          isLoading: true,
        })
      );
    }
  };

  return (
    <div className="verify-container">
      <div className="verify-card">
        {/* Encabezado */}
        <div className="verify-header">
          <h1 className="verify-title">E-Commerce JS</h1>
        </div>

        {/* Cuerpo */}
        <div className="verify-body">
          <div>
            {userState?.isVerified ? (
              <CheckCircleIcon className="verify-icon" />
            ) : (
              <MarkEmailReadIcon className="verify-icon" />
            )}
          </div>

          {!userState?.isVerified ? (
            <>
              <h2 className="verify-subtitle">¡Verifica tu cuenta!</h2>
              <p className="verify-text">
                Gracias por registrarte en nuestra plataforma. Para empezar a
                disfrutar de todos nuestros servicios, necesitamos verificar tu
                dirección de correo electrónico.
              </p>
              <div>
                <Button
                  onClick={handleVerifyAccount}
                  className="verify-button"
                  variant="contained"
                >
                  Verificar cuenta
                </Button>
              </div>
            </>
          ) : (
            <>
              <h2 className="verify-subtitle">¡Cuenta verificada!</h2>
              <p className="verify-text">
                Gracias por verificar tu cuenta. Ahora puedes disfrutar de todos
                nuestros servicios y realizar compras en nuestra plataforma.
              </p>
              <div>
                <Button href="/" className="verify-button" variant="contained">
                  Ir a la página principal
                </Button>
              </div>
            </>
          )}
        </div>

        {/* Pie */}
        <div className="verify-footer">
          <p className="verify-footer-text">
            Si no has solicitado esta cuenta, puedes ignorar este correo de
            forma segura.
          </p>
          <p className="verify-copyright">
            © {new Date().getFullYear()} E-Commerce JS. Todos los derechos
            reservados.
          </p>
        </div>
      </div>
    </div>
  );
};

export default VerifyAccount;
