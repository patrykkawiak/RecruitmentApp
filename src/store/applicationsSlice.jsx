import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [
    {
      id: "a1",
      name: "Patryk",
      lastname: "Kawiak",
      email: "patryk.kawiak@hotmail.com",
      phone: "669416762",
      city: "Kwidzyn",
      job: "Unemployed",
      vacancy: "FrontEndDeveloper",
      salary: 3999,
      resume: null,
      status: "open",
    },
    {
      id: "a2",
      name: "Paula",
      lastname: "Strześniewksa",
      email: "paula.strzesniewksa@hotmail.com",
      phone: "664244212",
      city: "Prabuty",
      job: "Unemployed",
      vacancy: "FrontEndDeveloper",
      salary: 3999,
      resume: null,
      status: "open",
    },
    {
      id: "a3",
      name: "Bon",
      lastname: "Scott",
      email: "bonito@hotmail.com",
      phone: "663454212",
      city: "London",
      job: "Unemployed",
      vacancy: "Backend",
      salary: 6999,
      resume: null,
      status: "rejected",
    },
  ],
  totalCount: 3,
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
		const item = state.items.find((item) => item.id === itemID);
		state.items.pop(item);
    state.totalCount--;
	  },
  },
});
export default applicationsSlice;
export const applicationsAction = applicationsSlice.actions;
