export interface PositionsData {
	[positionName: string]: Position;
}

export interface Position {
	name: string;
	days: number;
	positionCount: number;
	rate: number;
	secondsDrift: number;
}
