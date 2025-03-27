import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '../../models/user.interface';

interface AuthState {
    isAuthenticated: boolean;
    user: User | null;
}

const initialState: AuthState = {
    isAuthenticated: false,
    user: null,

};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        loginSuccess: (state, action: PayloadAction<AuthState>) => {
            state.isAuthenticated = action.payload.isAuthenticated;
            state.user = action.payload.user;
        },
        registerSuccess: (state, action: PayloadAction<AuthState>) => {
            state.isAuthenticated = action.payload.isAuthenticated;
            state.user = action.payload.user;
        },
        verifyAccountSuccess: (state, action: PayloadAction<AuthState>) => {
            state.isAuthenticated = action.payload.isAuthenticated;
            if (state.user) {
                state.user = { ...state.user, isVerified: true };
            }
        },
        logout: (state) => {
            state.isAuthenticated = false;
            state.user = null;
            localStorage.removeItem('user');
        },
    },
});

export const { loginSuccess, registerSuccess, verifyAccountSuccess, logout } = authSlice.actions;
export default authSlice.reducer;