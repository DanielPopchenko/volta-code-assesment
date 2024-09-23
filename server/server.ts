import express, { NextFunction, Request, Response } from 'express';
import cors from 'cors';
import { json } from 'body-parser';
import router from './routes/api/metrics';

const app = express();

app.use(cors());
app.use(json());

app.use('/api/metrics', router);
app.use((req, res) => {
	res.status(404).json({ message: 'Not found' });
});

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
	res.status(500).json({ message: err.message });
});

app.listen(4000, () => console.log('App is running on port 4000'));
