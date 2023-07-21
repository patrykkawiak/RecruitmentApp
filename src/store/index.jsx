import { configureStore } from '@reduxjs/toolkit';
import themeSlice from './themeSlice';
import brandSlice from './brandSlice';
const store = configureStore({
	reducer: {
		theme: themeSlice.reducer,
		brand: brandSlice.reducer,
	},
});

export default store;
 