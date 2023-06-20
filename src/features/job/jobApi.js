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
		apply: builder.mutation({
			query: (data) => ({
				url: '/apply',
				method: 'PATCH',
				body: data,
			}),
			invalidatesTags: ['Jobs'],
		}),
		getAppliedJobs: builder.query({
			query: (email) => `/applied-jobs/${email}`,
		}),
		getJobs: builder.query({
			query: () => '/jobs',
			providesTags: ['Jobs'],
		}),
		getJobById: builder.query({
			query: (id) => `/job/${id}`,
			providesTags: ['Job'],
		}),
		question: builder.mutation({
			query: (data) => ({
				url: '/query',
				method: 'PATCH',
				body: data,
			}),
			invalidatesTags: ['Job'],
		}),
		reply: builder.mutation({
			query: (data) => ({
				url: '/reply',
				method: 'PATCH',
				body: data,
			}),
			invalidatesTags: ['Job'],
		}),
	}),
});

export const {
	usePostJobMutation,
	useGetJobsQuery,
	useGetJobByIdQuery,
	useApplyMutation,
	useGetAppliedJobsQuery,
	useQuestionMutation,
	useReplyMutation,
} = jobApi;
