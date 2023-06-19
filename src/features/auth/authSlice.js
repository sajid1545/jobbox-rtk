import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	user: { email: '', role: '' },
	isLoading: true,
	isError: false,
	error: '',
};

const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		logOut: (state) => {
			state.user = { email: '', role: '' };
		},
	},
});

export const { logOut } = authSlice.actions;
export default authSlice.reducer;
