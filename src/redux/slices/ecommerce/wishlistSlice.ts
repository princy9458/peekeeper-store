import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import type { RootState } from '@/redux/store';

export interface WishlistItem {
  id: string;
  productId: string;
  name: string;
  price: number;
  image: string;
  slug: string;
}

export interface WishlistState {
  items: WishlistItem[];
  loading: boolean;
  error: string | null;
}

const initialState: WishlistState = {
  items: [],
  loading: false,
  error: null,
};

export const fetchWishlistThunk = createAsyncThunk(
  'wishlist/fetch',
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch('/api/wishlist');
      const data = await response.json();
      return data;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const addToWishlistThunk = createAsyncThunk(
  'wishlist/add',
  async (productId: string, { rejectWithValue }) => {
    try {
      const response = await fetch('/api/wishlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ productId }),
      });
      const data = await response.json();
      return data;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const removeFromWishlistThunk = createAsyncThunk(
  'wishlist/remove',
  async (id: string, { rejectWithValue }) => {
    try {
      const response = await fetch(`/api/wishlist/${id}`, {
        method: 'DELETE',
      });
      const data = await response.json();
      return data;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

const wishlistSlice = createSlice({
  name: 'wishlist',
  initialState,
  reducers: {
    addItem: (state, action: PayloadAction<{ productId: string; name: string; price: number; image: string; slug: string }>) => {
      const exists = state.items.some(i => i.productId === action.payload.productId);
      if (!exists) {
        const newItem: WishlistItem = {
          id: `wl_${action.payload.productId}`,
          productId: action.payload.productId,
          name: action.payload.name,
          price: action.payload.price,
          image: action.payload.image,
          slug: action.payload.slug
        };
        state.items.push(newItem);
      }
    },
    removeItem: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter(i => i.productId !== action.payload);
    },
    clearWishlist: (state) => {
      state.items = [];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchWishlistThunk.fulfilled, (state, action) => {
      state.items = action.payload.items;
    });
    builder.addCase(addToWishlistThunk.fulfilled, (state, action) => {
      state.items = action.payload.items;
    });
    builder.addCase(removeFromWishlistThunk.fulfilled, (state, action) => {
      state.items = action.payload.items;
    });
  },
});

export const selectWishlistItems = (state: RootState) => state.wishlist.items;
export const selectWishlistCount = (state: RootState) => state.wishlist.items.length;
export const selectIsInWishlist = (state: RootState, productId: string) =>
  state.wishlist.items.some(item => item.productId === productId);

export const { addItem, removeItem, clearWishlist } = wishlistSlice.actions;
export default wishlistSlice.reducer;
