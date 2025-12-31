import { type ShortScript } from '../types.js';

export function shortenScripts(scripts: Record<string, string>, separator: RegExp): ShortScript[] {
	const result: ShortScript[] = [];

	for(const [name] of Object.entries(scripts)) {
		if(name.length <= 1) {
			continue;
		}

		let short: string;

		const split = name.split(separator);

		if(split.length === 1) {
			short = name.at(0)!.toLowerCase() + name.at(-1)!.toLowerCase();
		}
		else {
			short = split.map((part) => part[0].toLowerCase()).join('');
		}

		result.push({
			name,
			short,
		});
	}

	return result;
}
