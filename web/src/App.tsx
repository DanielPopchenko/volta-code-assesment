import axios from 'axios';
import React, { FormEvent, useEffect, useState, ChangeEvent } from 'react';
import { IHealthRecord, IMetric } from './types/metrics.types';

import Metric from './components/Metric';

const BASE_URL = 'http://localhost:4000/api/metrics';

const App = () => {
	const [allMetrics, setAllMetrics] = useState<IHealthRecord>();
	const [err, setErr] = useState<any>(null);
	const [reloadNum, setReloadNum] = useState<number>(0);

	const [userInput, setUserInput] = useState<Omit<IMetric, 'userId'>>({
		steps: '',
		sleepHours: '',
		date: '',
	});

	useEffect(() => {
		axios
			.get(BASE_URL)
			.then(res => setAllMetrics(res.data.data))
			.catch(err => setErr(err.message));
	}, [reloadNum]);

	// POST DATA FN
	const postData = async (data: IMetric) => {
		console.log(JSON.stringify(data));
		await axios
			.post(`${BASE_URL}/new`, data)
			.then(res => {
				res.status === 201 &&
					setUserInput({
						steps: '',
						sleepHours: '',
						date: '',
					});

				setReloadNum(prev => (prev += 1));
			})
			.catch(err => setErr(err.message));
	};

	const deleteMetric = async (id: string | number | undefined) => {
		try {
			await axios.delete(`${BASE_URL}/${id}`).then(res => {
				setReloadNum(prev => (prev += 1));
			});
		} catch (error) {
			setErr(err.message);
		}
	};

	const onUserInputChange = (e: ChangeEvent<HTMLInputElement>) => {
		switch (e.target.name) {
			case 'steps':
				setUserInput(prev => ({ ...prev, steps: Number(e.target.value) }));
				break;
			case 'sleepHours':
				setUserInput(prev => ({ ...prev, sleepHours: Number(e.target.value) }));
				break;
			case 'date':
				setUserInput(prev => ({ ...prev, date: e.target.value }));
		}
	};

	const onFormSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		postData(userInput);
	};

	console.log(allMetrics);

	return (
		<div className='block bg-slate-200 min-h-screen w-screen p-20'>
			<div className='mb-6 mt-6'>
				<h1 className='text-2xl'>How did you do today?</h1>
				<form onSubmit={e => onFormSubmit(e)} className='flex flex-col'>
					<input
						type='text'
						placeholder='Steps'
						name='steps'
						value={userInput.steps}
						onChange={e => onUserInputChange(e)}
						className='max-w-[300px] mt-4 py-1 px-4 rounded-md '
					/>
					<input
						type='text'
						name='sleepHours'
						value={userInput.sleepHours}
						onChange={e => onUserInputChange(e)}
						placeholder='Hours of sleep'
						className='max-w-[300px] mt-4 py-1 px-4 rounded-md '
					/>
					<input
						type='date'
						name='date'
						value={userInput.date}
						onChange={e => onUserInputChange(e)}
						className='max-w-[300px] mt-4 py-1 px-4 rounded-md '
					/>

					<button
						type='submit'
						className='max-w-[100px] bg-slate-500 text-slate-50 py-1 px-2 rounded-md mt-4'
					>
						Save
					</button>
				</form>
			</div>
			{/* Your Metrics */}
			<p>{err ?? err?.message}</p>
			<div className=''>
				<h1 className='text-2xl'>Your daily metrics</h1>

				<div className='flex-col justify-center items-center'>
					{allMetrics?.data &&
						allMetrics?.data.map((data: IMetric) => {
							return (
								<Metric key={data.userId} data={data} onDelete={deleteMetric} />
							);
						})}
				</div>
			</div>
		</div>
	);
};

export default App;
