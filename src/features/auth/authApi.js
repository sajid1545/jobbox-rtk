import apiSlice from './../api/apiSlice';

const authApi = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		employRegister: builder.mutation({
			query: (data) => ({
				url: '/user',
				method: 'POST',
				body: data,
			}),
		}),
	}),
});

export const { useEmployRegisterMutation } = authApi;
