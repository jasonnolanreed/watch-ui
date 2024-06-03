export interface UserData {
	email: string;
}

export interface Watch {
	_id: string,
	goodTolerancePlus: number,
	goodToleranceMinus: number,
	note: string,
	userId: string,
	name: string,
}

export interface Measure {
	_id?: string;
	note: string;
	position: string;
	userId?: string;
	watchId: string;
	moment: string;
	targetMoment: string;
	firstOfSession: boolean;

	// UI fields
	customPositionId?: any;
	firstOfDay?: boolean;
}

export interface CustomPosition {
	_id: string;
	userId: string;
	name: string;
}

export interface TimegrapherResult {
	_id: string,
	userId: string,
	watchId: string,
	moment: string,
	dialUpRate: number,
	dialUpAmplitude: number,
	dialUpBeatError: number,
	dialDownRate: number,
	dialDownAmplitude: number,
	dialDownBeatError: number,
	crownRightRate: number,
	crownRightAmplitude: number,
	crownRightBeatError: number,
	crownDownRate: number,
	crownDownAmplitude: number,
	crownDownBeatError: number,
	crownLeftRate: number,
	crownLeftAmplitude: number,
	crownLeftBeatError: number,
	crownUpRate: number,
	crownUpAmplitude: number,
	crownUpBeatError: number,
	note: string,
}

export interface Preferences {
	_id: string,
	atomicOffset: number,
	userId: string,
	watchesSort: string;
	measuresSort: string;
	positionsSort: string;
	showTimegrapherFeatures: boolean;
}

export interface Stats {
	watchesCount: number;
	measuresCount: number;
	timegrapherResultsCount: number;
	usersCount: number;
	preusersCount: number;
	latestMeasures: StatsLineItem[];
	latestTimegrapherResults: StatsLineItem[];
}

export interface StatsLineItem {
	date: string;
	watch: string;
	watchId: string;
	user: string;
}
