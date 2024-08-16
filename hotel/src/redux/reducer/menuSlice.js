import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import configuredUrl from "../../../utils/request/request";

const initialState = {
  loading: false,
  cartItems: [],
  menuItems:[],
};

export const getMenu = createAsyncThunk(
  "getMenu",
  async (data, { rejectWithValue }) => {
    try {
      const {data} = await configuredUrl.get("/menu/all-items");
      return data.data;
    } catch (err) {
      return rejectWithValue(err)
    }
  }
)

export const menuSlicer = createSlice({
  name: "cartReducer",
  initialState,
  reducers: {
    addToCart: (state,action) => {
      state.loading = true;

      const index = state.cartItems.findIndex(
        (i) => i._id === action.payload._id
      );
      
      if (index !== -1) state.cartItems[index].quantity = state.cartItems[index].quantity+1;
      else state.cartItems.push(action.payload);
      state.loading = false;
    },

    removeCartItem: (state, action) => {
      state.loading = true;
      state.cartItems = state.cartItems.filter(
        (i) => i.id !== action.payload.id
      );
      state.loading = false;
    },

    increaseQuantity: (state, action) => {
      const index = state.cartItems.findIndex((i) => i._id === action.payload._id)
      state.cartItems[index].quantity += 1;
    },

    decreaseQuantity: (state, action) => {
      const index = state.cartItems.findIndex((i) => i._id === action.payload._id)
      if (state.cartItems[index].quantity === 1) {
        state.cartItems = state.cartItems.filter((i) => i._id !== action.payload._id)
      } else {
        state.cartItems[index].quantity -= 1;
      }

    },

    resetCart: () => initialState,
  },
  extraReducers: (builder) => {
    builder.addCase(
    getMenu.pending, (state) => {
      state.loading = true;
    })
    .addCase(getMenu.fulfilled, (state, action) => {
      state.loading = false;
      state.menuItems = action.payload;
    })
    .addCase(getMenu.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    })
  }
});

export const {
  addToCart,
  removeCartItem,
  resetCart,
  increaseQuantity,
  decreaseQuantity
} = menuSlicer.actions;

export default menuSlicer.reducer;