export type ShortScript = {
	name: string;
	short: string;
};

export type Request = {
	type: RequestType;
	continueOnError: boolean;
	query: string;
	args: string[];
	script?: string;
};

export type RequestType = 'parallel' | 'serie';
