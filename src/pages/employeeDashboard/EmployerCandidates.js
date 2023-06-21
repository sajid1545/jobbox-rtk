import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Loading from '../../components/reusable/Loading';
import { useGetJobsByEmployerIdQuery } from '../../features/job/jobApi';

const EmployerCandidates = () => {
	const { user } = useSelector((state) => state.auth);

	const { isLoading, data } = useGetJobsByEmployerIdQuery(user?._id);

	useEffect(() => {});

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
										Candidate Information
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
										{job.applicants.map((candidate, idx) => {
											return (
												<td
													key={idx}
													className=" px-6 text-sm transition duration-300 border-t border-l first:border-l-0 border-slate-200 stroke-slate-500 text-slate-500 flex flex-col items-center justify-center gap-5 ">
													<div className="h-[4rem] flex items-center gap-5 justify-center">
														<div className="">
															<h1>{candidate.email}</h1>
														</div>
														<Link to={`candidate-details/${candidate.id}`}>
															<button className="py-1 px-4  bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500 focus:ring-offset-indigo-200 text-white  transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-sm">
																Details
															</button>
														</Link>
													</div>
												</td>
											);
										})}
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

export default EmployerCandidates;

// <div>
// 					<h1>My candidates</h1>
// 					{data?.data?.map((item) => {
// 						return (
// 							<div>
// 								<h1>{item.position}</h1>
// 								{item.applicants.map((candidate) => {
// 									return (
// 										<div>
// 											<h1>{candidate.email}</h1>
// 										</div>
// 									);
// 								})}
// 							</div>
// 						);
// 					})}

// 				</div>