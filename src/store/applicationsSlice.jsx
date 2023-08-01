import { createSlice } from "@reduxjs/toolkit";


const initialState = {
  items: [],
  totalCount: 0,
};

const applicationsSlice = createSlice({
  name: "applications",
  initialState,
  reducers: {
    addNewApplication(state, action) {
      state.items.push({ ...action.payload, status: "open" });
      state.totalCount++;
    },
    addAcceptStatus(state, action) {
      const itemID = action.payload;
      const itemIndex = state.items.findIndex((item) => item.id === itemID);
      state.items[itemIndex].status = "accept";
    },
    addRejectStatus(state, action) {
      const itemID = action.payload;
      const itemIndex = state.items.findIndex((item) => item.id === itemID);
      state.items[itemIndex].status = "rejected";
    },
    removeApplication(state, action) {
      const itemID = action.payload;
      const item = state.items.filter((item) => item.id !== itemID);
      state.items = item
      state.totalCount--;
    },
    updateApplications(state, action) {
      state.items = action.payload
      state.totalCount = action.payload.length;
    }
  },
});
export default applicationsSlice;
export const applicationsAction = applicationsSlice.actions;
