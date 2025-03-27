import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./states/authSlice";
import snackbarReducer from "./states/snackbarSlice";
import cartReducer from "./states/cartSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    snackbar: snackbarReducer,
    cart: cartReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export type AppStore = typeof store;
