
import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const BASE_URL = 'https://fakestoreapi.com';

const productSlice = createSlice({
  name: 'product',
  initialState: {
    products: [],
    product: null,
    status: 'idle',
    error: null,
  },
  reducers: {
    setProductsLoading(state) {
      state.status = 'loading';
    },
    setProductsSuccess(state, action) {
      state.status = 'succeeded';
      state.products = action.payload;
    },
    setProductsFailed(state, action) {
      state.status = 'failed';
      state.error = action.payload;
    },
    setProductLoading(state) {
      state.status = 'loading';
    },
    setProductSuccess(state, action) {
      state.status = 'succeeded';
      state.product = action.payload;
    },
    setProductFailed(state, action) {
      state.status = 'failed';
      state.error = action.payload;
    },
  },
});


export const fetchProducts = () => async (dispatch) => {
  dispatch(setProductsLoading());
  try {
    const response = await axios.get(`${BASE_URL}/products`);
    console.log(response, 'redux')
    dispatch(setProductsSuccess(response.data));
  } catch (error) {
    dispatch(setProductsFailed(error.message));
  }
};

export const fetchProductById = (id) => async (dispatch) => {
  dispatch(setProductLoading());
  try {
    const response = await axios.get(`${BASE_URL}/products/${id}`);
    dispatch(setProductSuccess(response.data));
  } catch (error) {
    dispatch(setProductFailed(error.message));
  }
};

export const {
  setProductsLoading,
  setProductsSuccess,
  setProductsFailed,
  setProductLoading,
  setProductSuccess,
  setProductFailed,
} = productSlice.actions;

export default productSlice.reducer;
