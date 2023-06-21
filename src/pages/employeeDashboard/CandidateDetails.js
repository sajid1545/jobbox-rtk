import React from 'react';
import { BsArrowRightShort } from 'react-icons/bs';
import { useParams } from 'react-router-dom';
import Loading from '../../components/reusable/Loading';
import { useCandidateDetailsQuery } from '../../features/job/jobApi';

const CandidateDetails = () => {
	const { id } = useParams();

	const { isLoading, data } = useCandidateDetailsQuery(id);

	const { email, firstName, lastName, country, address, city, role, postcode } = data?.data || {};

	return (
		<>
			{isLoading ? (
				<Loading />
			) : (
				<div className="p-10">
					<div className="flex justify-between items-center">
						<h1 className="text-2xl">
							{firstName} {lastName}'s Details
						</h1>

						<p className="flex items-center  px-4 py-2 text-base text-blue-600 bg-blue-200 rounded-full hover:bg-blue-300">
							{role}
						</p>
					</div>

					<div className="bg-[#F0E9F1] rounded-xl p-5 my-10 space-y-4">
						<h1 className="text-primary font-bold">
							Name - {firstName} {lastName}{' '}
						</h1>
						<h1 className="text-primary font-bold">Email - {email}</h1>
						<h1 className="text-primary font-bold">
							Country - {country}, {city}{' '}
						</h1>
						<h1 className="text-primary font-bold">
							Address - {address}, {postcode}
						</h1>
					</div>

					<div className="flex gap-3 my-5">
						<input placeholder="Chat" type="text" className="w-full" />
						<button
							className="shrink-0 h-14 w-14 bg-primary/10 border border-primary hover:bg-primary rounded-full transition-all  grid place-items-center text-primary hover:text-white"
							type="button">
							<BsArrowRightShort size={30} />
						</button>
					</div>
				</div>
			)}
		</>
	);
};

export default CandidateDetails;
