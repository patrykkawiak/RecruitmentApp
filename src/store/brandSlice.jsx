import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	name: 'Malcom Company',
	img: 'https://images.pexels.com/photos/3181458/pexels-photo-3181458.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
	heading: 'Apply to MalcomCompany!',
	desc: 'We are very happy that you want to apply for a job at our company. Below, you will find a short survey - fill it in and attach your resume. In the case of positive verification, we will reach back to you within 7 days of applying. In addition, we would like to inform you that by applying to our company, you consent to the processing of your personal data in the recruitment process of Gamedia.pl Limited Liability Company based in Warsaw at Świeradowska 47 for recruitment purposes.',
};

const brandSlice = createSlice({
	name: 'brand',
	initialState: initialState,
	reducers: {
		changeDetails(state, action) {
			state.name = action.payload.name;
			state.img = action.payload.img;
			state.heading = action.payload.heading;
			state.desc = action.payload.desc;
		},
	},
});

export default brandSlice;
export const brandSliceActions = brandSlice.actions;
