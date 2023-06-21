import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import { BsArrowRightShort } from 'react-icons/bs';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import Loading from '../../components/reusable/Loading';
import { useCandidateDetailsQuery, useEmployerTextMutation } from '../../features/job/jobApi';

const CandidateDetails = () => {
	const { register, handleSubmit, reset } = useForm();
	const { id } = useParams();

	const { user } = useSelector((state) => state.auth);

	const { isLoading, data } = useCandidateDetailsQuery(id);
	const [
		addEmployerText,
		{ isSuccess: isEmployerTextSuccess, isError: isEmployerTextError, error: employerTextError },
	] = useEmployerTextMutation();

	const { email, firstName, lastName, country, address, city, role, postcode, _id, queries } =
		data?.data || {};

	useEffect(() => {
		if (isEmployerTextSuccess) {
			toast.success('Message sent successfully');
			reset();
			return;
		}
		if (isEmployerTextError) {
			toast.error(employerTextError);

			return;
		}
	}, [isEmployerTextSuccess, isEmployerTextError, employerTextError]);

	const handleEmployerText = (data) => {
		const textData = {
			candidateId: _id,
			employerId: user._id,
			employerEmail: user.email,
			employerText: data.employerText,
		};
		addEmployerText(textData);
	};

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

					<div className="text-primary my-2">
						{queries?.map(({ employerText, employerId, employerEmail, candidateId }, idx) => (
							<div key={idx}>
								<small>{employerEmail}</small>
								<p className="text-lg font-medium">{employerText}</p>
								{/* {reply?.map((item) => (
									<p className="flex items-center gap-2 relative left-5">
										<BsArrowReturnRight /> {item}
									</p>
								))}

								{user.role === 'employer' && (
									<div className="flex gap-3 my-5">
										<input
											onBlur={(event) => setReply(event.target.value)}
											placeholder="Reply"
											type="text"
											className="w-full"
										/>
										<button
											onClick={() => handleReply(id)}
											className="shrink-0 h-14 w-14 bg-primary/10 border border-primary hover:bg-primary rounded-full transition-all  grid place-items-center text-primary hover:text-white"
											type="button">
											<BsArrowRightShort size={30} />
										</button>
									</div>
								)} */}
							</div>
						))}
					</div>

					{user.role === 'employer' && (
						<form onSubmit={handleSubmit(handleEmployerText)}>
							<div className="flex gap-3 my-5">
								<input
									placeholder="Employer Chat"
									{...register('employerText')}
									type="text"
									className="w-full"
								/>
								<button
									className="shrink-0 h-14 w-14 bg-primary/10 border border-primary hover:bg-primary rounded-full transition-all  grid place-items-center text-primary hover:text-white"
									type="submit">
									<BsArrowRightShort size={30} />
								</button>
							</div>
						</form>
					)}

					{user.role === 'candidate' && (
						<form action="">
							<div className="flex gap-3 my-5">
								<input placeholder="Candidate Reply" type="text" className="w-full" />
								<button
									className="shrink-0 h-14 w-14 bg-primary/10 border border-primary hover:bg-primary rounded-full transition-all  grid place-items-center text-primary hover:text-white"
									type="button">
									<BsArrowRightShort size={30} />
								</button>
							</div>
						</form>
					)}
				</div>
			)}
		</>
	);
};

export default CandidateDetails;
