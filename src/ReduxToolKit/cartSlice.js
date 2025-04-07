import { createSlice } from "@reduxjs/toolkit";

const initialStateValue = { active: false };

export const cartSlice = createSlice({
    name: 'cartCount', // name of the slice
    initialState: { value: initialStateValue }, // initial satate
    // actual reducer function
    reducers: {
        cartCountApiCallActive: (state, action) => {
            state.value = action.payload;
        },
        cartCountApiCallInActive: (state) => {
            state.value = initialStateValue;
        }
    }
});

export const { cartCountApiCallActive, cartCountApiCallInActive } = cartSlice.actions;

export default cartSlice.reducer;