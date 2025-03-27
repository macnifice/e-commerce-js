import { Snackbar, Alert, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useAppDispatch, useAppSelector } from "../../hooks/hook";
import { hideSnackbar } from "../../redux/states/snackbarSlice";

const GlobalSnackbar = () => {
  const dispatch = useAppDispatch();
  const { open, message, severity } = useAppSelector((state) => state.snackbar);

  const handleClose = (
    _event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }
    dispatch(hideSnackbar());
  };

  return (
    <Snackbar
      open={open}
      autoHideDuration={3000}
      onClose={handleClose}
      anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
    >
      <Alert
        severity={severity}
        onClose={handleClose}
        action={
          <IconButton
            size="small"
            aria-label="close"
            color="inherit"
            onClick={handleClose}
          >
            <CloseIcon fontSize="small" />
          </IconButton>
        }
      >
        {message}
      </Alert>
    </Snackbar>
  );
};

export default GlobalSnackbar;
