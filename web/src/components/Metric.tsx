import { IMetric } from '../types/metrics.types';
import moment from 'moment';
import { BsCalendar2DateFill } from 'react-icons/bs';
import { IoFootsteps } from 'react-icons/io5';
import { GiNightSleep } from 'react-icons/gi';

interface IMetricProps {
	data: IMetric;
	onDelete: (id: string | number | undefined) => Promise<void>;
}
const Metric = ({ data, onDelete }: IMetricProps) => {
	let formatDate = moment(data.date, 'YYYYMMDD');
	const formattedDate = formatDate.format('MMM Do YYYY');
	return (
		<div className='w-[250px] border border-slate-500 mt-5 p-4 rounded-md items-center justify-center text-center'>
			<p className='font-bold mb-2 flex items-center justify-center text-center'>
				<span className='mr-2'>
					<BsCalendar2DateFill />
				</span>

				{formattedDate}
			</p>
			<p className='font-bold mb-2 flex items-center justify-center text-center'>
				<span className='mr-2'>
					<IoFootsteps />
				</span>{' '}
				{data.steps}
			</p>
			<p className='font-bold mb-2 flex items-center justify-center text-center'>
				<span className='mr-2'>
					<GiNightSleep />
				</span>
				{data.sleepHours}h
			</p>

			<button onClick={() => onDelete(data.userId)}>Delete</button>
		</div>
	);
};

export default Metric;
