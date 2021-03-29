import { configureStore } from "@reduxjs/toolkit";
import ocCatalog from "./slices/ocCatalog";
import ocAuth from "./slices/ocAuth";

const store = configureStore({
  reducer: {
    ocCatalog,
    ocAuth,
  },
});

export type OcRootState = ReturnType<typeof store.getState>;

export default store;
