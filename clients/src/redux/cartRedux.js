import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    products: [],
    quantity: 0,
    total: 0,
  },
  reducers: {
    addProduct: (state, action) => {
      state.quantity += 1;
      state.products.push(action.payload);
      state.total += action.payload.price * action.payload.quantity;
    },
    decrementProduct: (state, action) => {
      const productIndex = state.products.findIndex(
        (product) => product._id === action.payload
      );
      if (productIndex >= 0) {
        state.quantity -= 1;
        state.products[productIndex].quantity -= 1;
        if (state.products[productIndex].quantity === 0) {
          state.products.splice(productIndex, 1);
        }
        state.total -= state.products[productIndex].price;
      }
    },
    incrementProduct: (state, action) => {
      const productIndex = state.products.findIndex(
        (product) => product._id === action.payload
      );
      if (productIndex >= 0) {
        state.quantity += 1;
        state.products[productIndex].quantity += 1;
        state.total += state.products[productIndex].price;
      }
    },
    removeProduct: (state, action) => {
      const productIndex = state.products.findIndex(
        (product) => product._id === action.payload
      );
      if (productIndex >= 0) {
        state.products.splice(productIndex, 1);
        state.quantity -= 1;
        state.total -= state.products[productIndex].price;
      }
    },
  },
});

export const { addProduct, decrementProduct, incrementProduct,removeProduct } = cartSlice.actions;
export default cartSlice.reducer;