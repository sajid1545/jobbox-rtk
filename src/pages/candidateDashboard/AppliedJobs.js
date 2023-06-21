import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import JobCard from '../../components/reusable/JobCard';
import Loading from '../../components/reusable/Loading';
import { useGetAppliedJobsQuery } from '../../features/job/jobApi';
import { toggleApplyFilter } from '../../features/job/jobSlice';

import {
	FormControl,
	InputLabel,
	MenuItem,
	Select,
	ThemeProvider,
	createTheme,
} from '@mui/material';

const theme = createTheme({
	palette: {
		primary: {
			main: '#7D2074',
		},
	},
});

const AppliedJobs = () => {
	const { appliedFilter } = useSelector((state) => state.job);

	const {
		user: { email, firstName, lastName },
	} = useSelector((state) => state.auth);
	const { data, isLoading } = useGetAppliedJobsQuery({ email, appliedFilter });

	const dispatch = useDispatch();

	if (isLoading) {
		return <Loading />;
	}

	return (
		<div>
			<h1 className="text-xl py-5 font-bold text-primary">
				Applied jobs of {firstName} {lastName}{' '}
			</h1>
			{/* Filter Field */}
			<div className=" flex justify-end mb-10">
				<ThemeProvider theme={theme}>
					<FormControl>
						<InputLabel id="demo-simple-select-label">Filter</InputLabel>
						<Select
							labelId="demo-simple-select-label"
							id="demo-simple-select"
							label="Filter"
							defaultValue=""
							variant="outlined"
							className="custom-addUser-input w-[200px]  h-[60px] "
							sx={{ textAlign: 'left' }}>
							<MenuItem
								onClick={() => dispatch(toggleApplyFilter('firstApplied'))}
								value={'firstUpload'}>
								First Applied
							</MenuItem>
							<MenuItem
								onClick={() => dispatch(toggleApplyFilter('lastApplied'))}
								value={'lastUpload'}>
								Last Applied
							</MenuItem>
						</Select>
					</FormControl>
				</ThemeProvider>
			</div>
			<div className="grid grid-cols-1 gap-5 pb-5 px-20 md:px-0">
				{data?.data?.map((job) => (
					<>
						<JobCard key={job._id} jobData={job} />
					</>
				))}
			</div>
		</div>
	);
};

export default AppliedJobs;
