import { err, ok, type Result } from '@zokugun/xtry';
import c from 'ansi-colors';
import { type RequestType, type Request } from '../types.js';
import { splitCommandLine } from './split-command-line.js';

export type ParseQueryError = { type: 'UNPARSABLE'; message: string };

export function parseQuery(query: string): Result<Request[], ParseQueryError> {
	if(query.includes('+')) {
		if(query.includes(',')) {
			return err({ type: 'UNPARSABLE', message: `couldn't parse ${c.red(query)}` });
		}

		const result: Request[] = query.split('+').map(mapQuery('parallel')).filter((value) => !!value);

		return ok(result);
	}
	else {
		const result: Request[] = query.split(',').map(mapQuery('serie')).filter((value) => !!value);

		return ok(result);
	}
}

function mapQuery(type: RequestType): (value: string) => Request | undefined {
	return (value) => {
		const args = splitCommandLine(value);
		if(args.length === 0) {
			return;
		}

		let query = args.shift()!;

		if(query.length === 0) {
			return;
		}

		let continueOnError = false;

		if(query.endsWith('$')) {
			continueOnError = true;
			query = query.slice(0, -1);
		}

		return { type, continueOnError, query, args };
	};
}
