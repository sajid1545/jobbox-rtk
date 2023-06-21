import React, { useEffect } from 'react';
import { toast } from 'react-hot-toast';
import { useSelector } from 'react-redux';
import Loading from '../../components/reusable/Loading';
import { useCloseJobMutation, useGetJobsByEmployerIdQuery } from '../../features/job/jobApi';

const MyJobs = () => {
	const { user } = useSelector((state) => state.auth);

	const { isLoading, data } = useGetJobsByEmployerIdQuery(user?._id);

	const [closeJob, { isSuccess, isError, isLoading: jobStatusLoading, error }] =
		useCloseJobMutation();

	useEffect(() => {
		if (isSuccess) {
			toast.success('Status changed successfully');
			return;
		}
		if (isError) {
			toast.error(error);
			return;
		}
	}, [isSuccess, isError, error]);

	const handleCloseJobStatus = (id) => {
		closeJob(id);
	};

	return (
		<>
			{isLoading ? (
				<Loading />
			) : (
				<div className="h-screen flex items-center justify-center flex-col">
					<h1 className="text-primary text-2xl font-bold mb-4"> {user?.firstName}'s Jobs</h1>
					{/* Table */}
					<div className="w-full overflow-x-auto">
						<table
							className="w-full text-left border border-separate rounded border-slate-200"
							cellSpacing="0">
							<tbody>
								<tr className="text-center">
									<th
										scope="col"
										className="h-12 px-6 text-sm font-medium border-l first:border-l-0 stroke-slate-700 text-slate-700 bg-slate-100">
										Company Name
									</th>

									<th
										scope="col"
										className="h-12 px-6 text-sm font-medium border-l first:border-l-0 stroke-slate-700 text-slate-700 bg-slate-100">
										Position
									</th>
									<th
										scope="col"
										className="h-12 px-6 text-sm font-medium border-l first:border-l-0 stroke-slate-700 text-slate-700 bg-slate-100">
										Status
									</th>
									<th
										scope="col"
										className="h-12 px-6 text-sm font-medium border-l first:border-l-0 stroke-slate-700 text-slate-700 bg-slate-100">
										Action
									</th>
								</tr>
								{data?.data?.map((job) => (
									<tr key={job._id} className="odd:bg-slate-50 text-center">
										<td className="h-12 px-6 text-sm transition duration-300 border-t border-l first:border-l-0 border-slate-200 stroke-slate-500 text-slate-500 ">
											{job.companyName}
										</td>
										<td className="h-12 px-6 text-sm transition duration-300 border-t border-l first:border-l-0 border-slate-200 stroke-slate-500 text-slate-500 ">
											{job.position}
										</td>
										<td className="h-12 px-6 text-sm transition duration-300 border-t border-l first:border-l-0 border-slate-200 stroke-slate-500 text-slate-500 ">
											{job.jobStatus === 'open' ? (
												<span className="whitespace-nowrap rounded-full bg-green-100 px-2.5 py-0.5 text-sm text-green-700">
													{job.jobStatus}
												</span>
											) : (
												<span className="whitespace-nowrap rounded-full bg-red-100 px-2.5 py-0.5 text-sm text-red-700">
													{job.jobStatus}
												</span>
											)}
										</td>
										<td className="h-12 px-6 text-sm transition duration-300 border-t border-l first:border-l-0 border-slate-200 stroke-slate-500 text-slate-500 ">
											{job.jobStatus === 'open' ? (
												<button
													onClick={() => handleCloseJobStatus(job._id)}
													type="button"
													className="py-1 px-4  bg-red-600 hover:bg-red-700 focus:ring-red-500 focus:ring-offset-red-200 text-white  transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-sm ">
													{jobStatusLoading ? 'Updating...' : 'Close'}
												</button>
											) : (
												<span className="whitespace-nowrap rounded-full bg-red-100 px-2.5 py-0.5 text-sm text-red-700">
													{job.jobStatus}
												</span>
											)}
										</td>
									</tr>
								))}
							</tbody>
						</table>
					</div>
				</div>
			)}
		</>
	);
};

export default MyJobs;
