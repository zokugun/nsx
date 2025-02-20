import { type ShortScript } from '../types.js';

export function matchQuery(scripts: Record<string, string>, shortenedScripts: ShortScript[], query: string): string[] {
	const result: string[] = [];

	for(const script in scripts) {
		if(script.startsWith(query) && !result.includes(script)) {
			result.push(script);
		}
	}

	for(const script of shortenedScripts) {
		if(script.short === query && !result.includes(script.name)) {
			result.push(script.name);
		}
	}

	return result;
}
