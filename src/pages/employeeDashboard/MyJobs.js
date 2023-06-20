import React from 'react';
import { useSelector } from 'react-redux';

const MyJobs = () => {
	const { user } = useSelector((state) => state.auth);

	return (
		<div className="h-screen flex items-center justify-center flex-col">
			<h1>My Jobs</h1>
			{/* Table */}
			<div className="w-full overflow-x-auto">
				<table
					className="w-full text-left border border-separate rounded border-slate-200"
					cellspacing="0">
					<tbody>
						<tr>
							<th
								scope="col"
								className="h-12 px-6 text-sm font-medium border-l first:border-l-0 stroke-slate-700 text-slate-700 bg-slate-100">
								Company Name
							</th>

							<th
								scope="col"
								className="h-12 px-6 text-sm font-medium border-l first:border-l-0 stroke-slate-700 text-slate-700 bg-slate-100">
								Company
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
						</tr>
						<tr className="odd:bg-slate-50">
							<td className="h-12 px-6 text-sm transition duration-300 border-t border-l first:border-l-0 border-slate-200 stroke-slate-500 text-slate-500 ">
								Ayub Salas
							</td>
							<td className="h-12 px-6 text-sm transition duration-300 border-t border-l first:border-l-0 border-slate-200 stroke-slate-500 text-slate-500 ">
								Designer
							</td>
							<td className="h-12 px-6 text-sm transition duration-300 border-t border-l first:border-l-0 border-slate-200 stroke-slate-500 text-slate-500 ">
								Carroll Group
							</td>
							<td className="h-12 px-6 text-sm transition duration-300 border-t border-l first:border-l-0 border-slate-200 stroke-slate-500 text-slate-500 ">
								Member
							</td>
							<td className="h-12 px-6 text-sm transition duration-300 border-t border-l first:border-l-0 border-slate-200 stroke-slate-500 text-slate-500 ">
								salas_a
							</td>
						</tr>
					</tbody>
				</table>
			</div>
		</div>
	);
};

export default MyJobs;
