import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface CartItem {
    id: string;
    name: string;
    price: number;
    quantity: number;
    image?: string;
    stock: number;
    description?: string;
    businessId: number;
}

interface CartState {
    items: CartItem[];
}

const initialState: CartState = {
    items: [],
};

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart: (state, action: PayloadAction<Omit<CartItem, 'quantity'>>) => {
            const existingItem = state.items.find(item => item.id === action.payload.id);

            if (existingItem) {
                existingItem.quantity += 1;
            } else {
                state.items.push({ ...action.payload, quantity: 1 });
            }
        },

        removeFromCart: (state, action: PayloadAction<string>) => {
            state.items = state.items.filter(item => item.id !== action.payload);
        },

        updateQuantity: (state, action: PayloadAction<{ id: string, quantity: number }>) => {
            const { id, quantity } = action.payload;
            const item = state.items.find(item => item.id === id);

            if (item) {
                item.quantity = Math.min(quantity, item.stock);
            }
        },

        clearCart: (state) => {
            state.items = [];
        }
    }
});

export const { addToCart, removeFromCart, updateQuantity, clearCart } = cartSlice.actions;
export default cartSlice.reducer;


