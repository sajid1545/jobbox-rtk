import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	appliedFilter: '',
};

const jobSlice = createSlice({
	name: 'job',
	initialState,
	reducers: {
		toggleApplyFilter: (state, action) => {
			state.appliedFilter = action.payload;
		},
	},
});

export const { toggleApplyFilter } = jobSlice.actions;
export default jobSlice.reducer;
