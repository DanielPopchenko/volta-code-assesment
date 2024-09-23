import express, { Response, Request } from 'express';
import { v4 } from 'uuid';
import { readFileSync, writeFileSync } from 'fs';
import path from 'path';
import IHealthRecord from '../../HealthRecord';
import { IMetric } from '../../../web/src/types/metrics.types';

const router = express.Router();

// const readDb = () => {
// 	const filePath = path.join(__dirname, 'db.json');
// 	const data: IHealthRecord[] = readFileSync(filePath);
// 	return JSON.parse(data);
// };

interface IDB {
	data: IHealthRecord[];
}

const readDB = (): IDB => {
	const filePath = path.join(__dirname, './db.json');
	const data = readFileSync(filePath, 'utf-8');
	return JSON.parse(data) as IDB;
};

// Helper function to write to db.json
const writeDB = (data: IDB): void => {
	const filePath = path.join(__dirname, './db.json');
	writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf-8');
};

router.get('/', (req: Request, res: Response) => {
	try {
		const allMetrics = readDB();
		res.status(200).json({
			data: allMetrics,
		});
	} catch (error) {
		res.json({ message: 'Couldn`t get data. Please, try again.' });
	}
});

router.post('/new', (req: Request, res: Response) => {
	try {
		const { steps, sleepHours, date } = req.body;
		const newObj: Omit<IHealthRecord, 'userId'> = { steps, sleepHours, date };
		const data = readDB();
		const newId = v4();
		data.data.push({ userId: newId, ...newObj });

		writeDB(data);

		res.status(201).json({
			data: newObj,
		});
	} catch (error) {
		res.json({ message: 'Couldn`t create new metric. Please, try again.' });
	}
});

router.delete('/:id', (req: Request, res: Response) => {
	const { id } = req.params;

	const metrics = readDB();
	const metricId = metrics.data.findIndex(book => book.userId === id);
	if (metricId === -1) null;
	const [result] = metrics.data.splice(metricId, 1);

	writeDB(metrics);

	res.status(200).json({
		data: result,
	});
});

export default router;
