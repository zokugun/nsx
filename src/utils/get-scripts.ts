import { readFileSync } from 'fs';
import { join } from 'path';
import c from 'ansi-colors';

export function getScripts(path: string): Record<string, string> {
	const packagePath = join(path, 'package.json');

	let content: Buffer;

	try {
		content = readFileSync(packagePath);
	}
	catch {
		throw new Error(`couldn't read ${c.red('package.json')} (${c.cyan(packagePath)})`);
	}

	const scripts = JSON.parse(content.toString()).scripts as Record<string, string>;

	if(!scripts || Object.keys(scripts).length === 0) {
		throw new Error(`package.json has no scripts (${c.cyan(packagePath)})`);
	}

	return scripts;
}
