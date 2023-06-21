import { createBrowserRouter } from 'react-router-dom';
import Dashboard from '../layout/dashboard/Dashboard';
import Main from '../layout/main/Main';
import JobDetails from '../pages/JobDetails';
import Jobs from '../pages/Jobs';
import Login from '../pages/Login';
import Signup from '../pages/Signup';
import CandidateDashboard from '../pages/candidateDashboard/CandidateDashboard';
import AddJob from '../pages/employeeDashboard/AddJob';
import EmployerCandidates from '../pages/employeeDashboard/EmployerCandidates';
import EmployerDashboard from '../pages/employeeDashboard/EmployerDashboard';
import MyJobs from '../pages/employeeDashboard/MyJobs';
import Home from '../pages/home/Home';
import AccountCreator from '../pages/register/AccountCreator';
import PrivateRoute from '../utils/PrivateRoute';
import AppliedJobs from './../pages/candidateDashboard/AppliedJobs';

const routes = createBrowserRouter([
	{
		path: '/',
		element: <Main />,
		children: [
			{
				path: '/',
				element: <Home />,
			},
			{
				path: '/jobs',
				element: <Jobs />,
			},
			{
				path: '/job-details/:id',
				element: <JobDetails />,
			},
			{
				path: '/login',
				element: <Login />,
			},
			{
				path: '/signup',
				element: <Signup />,
			},
			{
				path: '/register',
				element: (
					<PrivateRoute>
						<AccountCreator />
					</PrivateRoute>
				),
			},
			{
				path: '/register/:type',
				element: (
					<PrivateRoute>
						<AccountCreator />
					</PrivateRoute>
				),
			},
		],
	},
	{
		path: '/dashboard',
		element: (
			<PrivateRoute>
				<Dashboard />
			</PrivateRoute>
		),
		children: [
			{
				path: 'my-jobs',
				element: <MyJobs />,
			},
			{
				path: 'employer-candidates',
				element: <EmployerCandidates />,
			},
			{
				path: 'add-job',
				element: <AddJob />,
			},
			{
				path: 'applied-jobs',
				element: <AppliedJobs />,
			},
			{
				path: 'employer',
				element: <EmployerDashboard />,
			},
			{
				path: 'candidate',
				element: <CandidateDashboard />,
			},
			{
				path: 'employer-candidates/candidate-details/:id',
				element: <CandidateDashboard />,
			},
		],
	},
]);

export default routes;
