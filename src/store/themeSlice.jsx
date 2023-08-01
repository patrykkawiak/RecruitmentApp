import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  color: "#000000",
};

const themeSlice = createSlice({
  name: "theme",
  initialState: initialState,
  reducers: {
    changeColor(state, action) {
      state.color = action.payload;
    },
  },
});

export default themeSlice;
export const themeSliceActions = themeSlice.actions;
