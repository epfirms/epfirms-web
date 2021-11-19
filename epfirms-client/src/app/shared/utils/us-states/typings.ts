export type USAZipCode = string;

export type USAZipCodeRange = [USAZipCode, USAZipCode];

export interface USAStateArea {
	year: number;
	value: number; // in square miles
}

export interface USAStatePopulation {
	year: number;
	count: number;
}

export interface USAState {
	name: string;
	abbreviation: string;
	territory: boolean;
	capital: string;
	contiguous: boolean;
	zipCodes?: USAZipCodeRange[];
	area?: USAStateArea;
	population?: USAStatePopulation;
	counties?: string[];
}

export interface USACity {
	name: string;
	state: string;
}