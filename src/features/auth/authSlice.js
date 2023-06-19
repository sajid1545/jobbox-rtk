import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import auth from './../../firebase/firebase.config';

const initialState = {
	user: { email: '', role: '' },
	isLoading: true,
	isError: false,
	error: '',
};

export const createUser = createAsyncThunk('auth/createUser', async ({ email, password }) => {
	const data = await createUserWithEmailAndPassword(auth, email, password);
	return data.user.email;
});

const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		logOut: (state) => {
			state.user = { email: '', role: '' };
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(createUser.pending, (state) => {
				state.isLoading = true;
				state.isError = false;
			})
			.addCase(createUser.fulfilled, (state, { payload }) => {
				state.isLoading = false;
				state.isError = false;
				state.user.email = payload;
			})
			.addCase(createUser.rejected, (state, action) => {
				state.isLoading = false;
				state.user.email = '';
				state.isError = true;
				state.error = action.error.message;
			});
	},
});

export const { logOut } = authSlice.actions;
export default authSlice.reducer;
