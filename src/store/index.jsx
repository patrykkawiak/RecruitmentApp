import { configureStore } from "@reduxjs/toolkit";
import themeSlice from "./themeSlice";
import brandSlice from "./brandSlice";
import applicationsSlice from "./applicationsSlice";
const store = configureStore({
  reducer: {
    theme: themeSlice.reducer,
    brand: brandSlice.reducer,
    applications: applicationsSlice.reducer,
  },
});

export default store;
