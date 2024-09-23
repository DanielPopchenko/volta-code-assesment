export interface IMetric {
	userId?: number | string;
	steps: number | string;
	sleepHours: number | string;
	date: any;
}

export interface IHealthRecord {
	data: IMetric[];
}
