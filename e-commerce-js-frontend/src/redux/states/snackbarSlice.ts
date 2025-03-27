import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface SnackbarState {
  open: boolean;
  message: string;
  severity?: "success" | "error" | "warning" | "info";
}

const initialState: SnackbarState = {
  open: false,
  message: "",
  severity: "info"
};

export const snackbarSlice = createSlice({
  name: "snackbar",
  initialState,
  reducers: {
    showSnackbar: (state, action: PayloadAction<Omit<SnackbarState, "open">>) => {
      state.open = true;
      state.message = action.payload.message;
      state.severity = action.payload.severity || "info";
    },
    hideSnackbar: (state) => {
      state.open = false;
      state.message = "";
    }
  }
});

export const { showSnackbar, hideSnackbar } = snackbarSlice.actions;
export default snackbarSlice.reducer; 