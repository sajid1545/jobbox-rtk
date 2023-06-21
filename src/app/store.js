import { configureStore } from '@reduxjs/toolkit';
import apiSlice from '../features/api/apiSlice';
import authSlice from '../features/auth/authSlice';
import jobSlice from '../features/job/jobSlice';

const store = configureStore({
	reducer: {
		auth: authSlice,
		job: jobSlice,
		[apiSlice.reducerPath]: apiSlice.reducer,
	},

	middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware),
});

export default store;
