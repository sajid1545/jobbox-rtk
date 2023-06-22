import React from 'react';
import JobCard from '../components/reusable/JobCard';
import { useGetJobsQuery } from '../features/job/jobApi';

const Jobs = () => {
	const { isLoading, data } = useGetJobsQuery();

	const openJobs = data?.data?.filter((job) => job.jobStatus === 'open');

	return (
		<div className="pt-14">
			<div className="bg-primary/10 p-5 rounded-2xl">
				<h1 className="font-semibold text-xl">Find Jobs</h1>
			</div>
			{isLoading ? (
				<h1 className="text-5xl text-center">Loading....</h1>
			) : (
				<div className="grid grid-cols-2 gap-5 mt-5">
					{openJobs?.map((job) => (
						<JobCard key={job._id} jobData={job} />
					))}
				</div>
			)}
		</div>
	);
};

export default Jobs;
