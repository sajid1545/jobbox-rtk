import React from 'react';
import { FaChevronLeft } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
const Sidebar = () => {
	const { user } = useSelector((state) => state.auth);

	const employerRoutes = [
		{
			name: 'Add Job',
			path: 'add-job',
		},
		{
			name: 'My Jobs',
			path: 'my-jobs',
		},
		{
			name: 'My Candidates',
			path: 'employer-candidates',
		},
	];

	const candidateRoutes = [
		{
			name: 'Applied Jobs',
			path: 'applied-jobs',
		},
		{
			name: 'My Details',
			path: `candidate-details/${user._id}`,
		},
	];

	return (
		<div className="bg-primary/10 col-span-2 h-screen sticky top-0">
			<ul className="flex flex-col gap-2 w-full h-full  p-3">
				<div className="flex justify-between items-center text-primary my-1">
					<Link to="/" className="flex items-center">
						<FaChevronLeft />
						<h1>Back</h1>
					</Link>
					<h1 className="text-xl">Dashboard</h1>
				</div>

				{user.role === 'employer' &&
					employerRoutes.map(({ name, path }, idx) => {
						return (
							<li key={idx}>
								<Link
									className="hover:bg-primary hover:text-white bg-primary/10 transition-all w-full block py-2 px-3 rounded-full"
									to={path}>
									{name}
								</Link>
							</li>
						);
					})}

				{user.role === 'candidate' &&
					candidateRoutes.map(({ name, path }, idx) => {
						return (
							<li key={idx}>
								<Link
									className="hover:bg-primary hover:text-white bg-primary/10 transition-all w-full block py-2 px-3 rounded-full"
									to={path}>
									{name}
								</Link>
							</li>
						);
					})}
			</ul>
		</div>
	);
};

export default Sidebar;
