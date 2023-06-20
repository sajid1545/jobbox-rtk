import apiSlice from './../api/apiSlice';

const jobApi = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		postJob: builder.mutation({
			query: (data) => ({
				url: '/job',
				method: 'POST',
				body: data,
			}),
			invalidatesTags: ['Jobs'],
		}),
		getJobs: builder.query({
			query: () => '/jobs',
			providesTags: ['Jobs'],
		}),
	}),
});

export const { usePostJobMutation, useGetJobsQuery } = jobApi;
