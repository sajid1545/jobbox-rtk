import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const apiSlice = createApi({
	reducerPath: 'api',
	baseQuery: fetchBaseQuery({
		baseUrl: 'https://jobbox-server-rho.vercel.app',
		// baseUrl: 'http://localhost:5000'
	}),
	tagTypes: ['Jobs', 'Job', 'Apply', 'EmployerJobs', 'Candidate'],
	endpoints: () => ({}),
});

export default apiSlice;
