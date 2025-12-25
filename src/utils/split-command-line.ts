export function splitCommandLine(value: string): string[] {
	value = value.trim();

	const args: string[] = [];
	let current = '';
	let inSingle = false;
	let inDouble = false;
	let escaped = false;

	for(const ch of value) {
		if(escaped) {
			current += ch;
			escaped = false;
			continue;
		}

		if(ch === '\\') {
			if(inSingle) {
				current += '\\';
			}
			else {
				escaped = true;
			}

			continue;
		}

		if(ch === '\'' && !inDouble) {
			inSingle = !inSingle;
			continue;
		}

		if(ch === '"' && !inSingle) {
			inDouble = !inDouble;
			continue;
		}

		if(!inSingle && !inDouble && /\s/.test(ch)) {
			if(current.length > 0) {
				args.push(current);
				current = '';
			}

			continue;
		}

		current += ch;
	}

	if(escaped) {
		current += '\\';
	}

	if(inSingle || inDouble) {
		throw new Error('Unterminated quote in command line');
	}

	if(current.length > 0) {
		args.push(current);
	}

	return args;
}
