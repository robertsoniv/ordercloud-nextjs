import { createAsyncThunk, createSlice, Dictionary } from "@reduxjs/toolkit";
import { initial, keyBy } from "lodash";
import {
  BuyerProduct,
  Category,
  ListPageWithFacets,
  Me,
  Meta,
  MetaWithFacets,
} from "ordercloud-javascript-sdk";
import { OcRootState } from "../appStore";
import { withOcErrorHandler } from "../withOcErrorHandler";

export const setListOptions = createAsyncThunk(
  "ocCatalog/setListOptions",
  (listOptions: any, thunkAPI) => {
    thunkAPI.dispatch(listProducts(listOptions));
    return Promise.resolve(listOptions);
  }
);

export const listProducts = createAsyncThunk(
  "ocCatalog/listproducts",
  withOcErrorHandler<ListPageWithFacets<BuyerProduct>, any>(
    async (listOptions: any, thunkAPI) => {
      // thunkAPI.dispatch(logout)
      return await Me.ListProducts(listOptions);
    }
  )
);

export const setProduct = createAsyncThunk(
  "ocCatalog/setproduct",
  withOcErrorHandler<BuyerProduct, string>(
    async (productId: string, thunkAPI: any) => {
      const currentState: OcRootState = thunkAPI.getState();
      if (currentState.ocCatalog.products.cache[productId]) {
        return Promise.resolve(
          currentState.ocCatalog.products.cache[productId]
        );
      }
      return await Me.GetProduct(productId);
    }
  )
);

interface OcCatalogState {
  categories: {
    listOptions?: any;
    cache: Dictionary<Category>;
    meta?: Meta;
    items?: Category[];
    current?: Category;
  };
  products: {
    listOptions?: any;
    cache: Dictionary<BuyerProduct>;
    meta?: MetaWithFacets;
    items?: BuyerProduct[];
    current: {
      product?: BuyerProduct;
      error?: boolean;
    };
  };
}

export const initialState: OcCatalogState = {
  products: {
    cache: {},
    current: {},
  },
  categories: {
    cache: {},
  },
};

export type OcCatalogProductsState = typeof initialState.products;
export type OcCatalogProductDetailState = typeof initialState.products.current;

const ocCatalogSlice = createSlice({
  name: "ocCatalog",
  initialState,
  reducers: {
    cleanCatalogCache: (state) => {
      state.products.cache = {};
      state.categories.cache = {};
    },
  },
  extraReducers: (builder) => {
    builder.addCase(listProducts.pending, (state) => {
      state.products.items = undefined;
      // state.products.meta = undefined;
    });
    builder.addCase(listProducts.fulfilled, (state, action) => {
      state.products.items = action.payload.Items;
      state.products.cache = {
        ...state.products.cache,
        ...keyBy(action.payload.Items, "ID"),
      };
      state.products.meta = action.payload.Meta;
    });
    builder.addCase(setListOptions.pending, (state, action) => {
      state.products.listOptions = action.meta.arg;
    });
    builder.addCase(setListOptions.fulfilled, (state, action) => {
      state.products.listOptions = action.payload;
    });
    builder.addCase(setProduct.pending, (state) => {
      state.products.current = {};
    });
    builder.addCase(setProduct.fulfilled, (state, action) => {
      state.products.current.product = action.payload;
      state.products.cache[action.payload.ID] = action.payload;
    });
    builder.addCase(setProduct.rejected, (state) => {
      state.products.current.error = true;
    });
  },
});

export const cleanCatalogCache = ocCatalogSlice.actions.cleanCatalogCache;

export default ocCatalogSlice.reducer;
