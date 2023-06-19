import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
	GoogleAuthProvider,
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
	signInWithPopup,
} from 'firebase/auth';
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

export const getUser = createAsyncThunk('auth/getUser', async (email) => {
	const res = await fetch(`${process.env.REACT_APP_API_URL}/user/${email}`);
	const data = await res.json();
	if (data.status) {
		return data;
	}

	return email;
});

export const loginUser = createAsyncThunk('auth/loginUser', async ({ email, password }) => {
	const data = await signInWithEmailAndPassword(auth, email, password);
	return data.user.email;
});

export const googleLogin = createAsyncThunk('auth/googleLogin', async () => {
	const googleProvider = new GoogleAuthProvider();
	const data = await signInWithPopup(auth, googleProvider);
	return data.user.email;
});

const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		logOut: (state) => {
			state.user = { email: '', role: '' };
		},
		setUser: (state, action) => {
			state.user.email = action.payload;
			state.isLoading = false;
		},
		toggleLoading: (state) => {
			state.isLoading = false;
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
			})
			.addCase(loginUser.pending, (state) => {
				state.isLoading = true;
				state.isError = false;
			})
			.addCase(loginUser.fulfilled, (state, { payload }) => {
				state.isLoading = false;
				state.isError = false;
				state.user.email = payload;
			})
			.addCase(loginUser.rejected, (state, action) => {
				state.isLoading = false;
				state.user.email = '';
				state.isError = true;
				state.error = action.error.message;
			})
			.addCase(googleLogin.pending, (state) => {
				state.isLoading = true;
				state.isError = false;
			})
			.addCase(googleLogin.fulfilled, (state, { payload }) => {
				state.isLoading = false;
				state.isError = false;
				state.user.email = payload;
			})
			.addCase(googleLogin.rejected, (state, action) => {
				state.isLoading = false;
				state.user.email = '';
				state.isError = true;
				state.error = action.error.message;
			})
			.addCase(getUser.pending, (state) => {
				state.isLoading = true;
				state.isError = false;
			})
			.addCase(getUser.fulfilled, (state, { payload }) => {
				state.isLoading = false;
				state.isError = false;
				if (payload.status) {
					state.user = payload.data;
				} else {
					state.user.email = payload;
				}
			})
			.addCase(getUser.rejected, (state, action) => {
				state.isLoading = false;
				state.user.email = '';
				state.isError = true;
				state.error = action.error.message;
			});
	},
});

export const { logOut, setUser, toggleLoading } = authSlice.actions;
export default authSlice.reducer;
