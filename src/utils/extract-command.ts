export function extractCommand(value: string): { query: string; args: string } {
	value = value.trim();

	const length = value.length;

	if(length === 0) {
		return { query: '', args: '' };
	}

	let index = 0;

	let current = '';
	let inSingle = false;
	let inDouble = false;
	let escaped = false;

	for(; index < length;) {
		const ch = value[index];

		if(escaped) {
			current += ch;
			escaped = false;
			index++;
			continue;
		}

		if(ch === '\\') {
			if(inSingle) {
				current += '\\';
				index++;
			}
			else {
				escaped = true;
				index++;
			}

			continue;
		}

		if(ch === '\'' && !inDouble) {
			inSingle = !inSingle;
			index++;
			continue;
		}

		if(ch === '"' && !inSingle) {
			inDouble = !inDouble;
			index++;
			continue;
		}

		if(!inSingle && !inDouble && /\s/.test(ch)) {
			break;
		}

		current += ch;
		index++;
	}

	if(escaped) {
		current += '\\';
	}

	if(inSingle || inDouble) {
		throw new Error('Unterminated quote in command line');
	}

	return { query: current, args: value.slice(index) };
}
