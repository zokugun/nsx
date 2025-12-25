import { type ShortScript } from '../types.js';

export function matchQuery(scripts: Record<string, string>, shortenedScripts: ShortScript[], query: string): string[] {
	const result: string[] = [];

	if(query.length === 4) {
		const match = /([a-z])\.\.([a-z])/.exec(query);

		if(match) {
			const [,first, last] = match;

			for(const script in scripts) {
				if(script.at(0) === first && script.at(-1) === last && !result.includes(script)) {
					result.push(script);
				}
			}
		}
	}

	if(query.length >= 3 && /[a-z]+(#[a-z]+)+/.test(query)) {
		const regex = new RegExp(query.replaceAll('#', '.*'));

		for(const script in scripts) {
			if(regex.test(script) && !result.includes(script)) {
				result.push(script);
			}
		}
	}

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
