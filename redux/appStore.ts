import { configureStore } from "@reduxjs/toolkit";
import orderCloud from "./slices/ordercloud";

const store = configureStore({
  reducer: {
    orderCloud: orderCloud,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export default store;
