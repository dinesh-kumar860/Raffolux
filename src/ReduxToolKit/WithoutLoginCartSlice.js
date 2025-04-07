import { createSlice } from "@reduxjs/toolkit";

const initialStateValue = 0;

export const WithoutLoginCartSlice = createSlice({
    name: 'WithoutLoginCartCount',
    initialState:  initialStateValue ,
    // actual reducer function
    reducers: {
        cartWithoutLoginCount: (state, action) => {
            return action.payload
        },

    }
});

export const { cartWithoutLoginCount } = WithoutLoginCartSlice.actions;

export default WithoutLoginCartSlice.reducer;