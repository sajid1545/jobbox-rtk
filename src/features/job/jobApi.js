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
			invalidatesTags: ['Jobs', 'Apply'],
		}),
		getAppliedJobs: builder.query({
			query: (email) => `/applied-jobs/${email}`,
			providesTags: ['Apply'],
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
		getJobsByEmployerId: builder.query({
			query: (id) => `/job/employer-jobs/${id}`,
			providesTags: ['EmployerJobs'],
		}),

		closeJob: builder.mutation({
			query: (id) => ({
				url: `/close-job/${id}`,
				method: 'PATCH',
				body: id,
			}),
			invalidatesTags: ['EmployerJobs'],
		}),

		candidateDetails: builder.query({
			query: (id) => `/candidate-details/${id}`,
			providesTags: ['Candidate'],
		}),

		employerText: builder.mutation({
			query: (data) => ({
				url: `/employer-text`,
				method: 'PATCH',
				body: data,
			}),
			invalidatesTags: ['Candidate'],
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
	useGetJobsByEmployerIdQuery,
	useCloseJobMutation,
	useCandidateDetailsQuery,
} = jobApi;
