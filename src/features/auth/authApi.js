import apiSlice from './../api/apiSlice';
import { getUser } from './authSlice';

const authApi = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		employRegister: builder.mutation({
			query: (data) => ({
				url: '/user',
				method: 'POST',
				body: data,
			}),

			async onQueryStarted(data, { dispatch, queryFulfilled }) {
				try {
					const res = await queryFulfilled;
					dispatch(getUser(data.email));
				} catch (error) {
					// nothing to handle here
				}
			},
		}),
	}),
});

export const { useEmployRegisterMutation } = authApi;
