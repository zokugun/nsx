import { type ShortScript } from '../types.js';

export function shortenScripts(scripts: Record<string, string>, separator: string): ShortScript[] {
	const result: ShortScript[] = [];

	for(const [name] of Object.entries(scripts)) {
		const short = name.split(separator).map((part) => part[0].toLowerCase()).join('');

		result.push({
			name,
			short,
		});
	}

	return result;
}
