import { readFileSync } from 'fs';
import { join } from 'path';
import { err, ok, type Result, xtry } from '@zokugun/xtry';
import c from 'ansi-colors';

export type GetScriptsError = { type: 'NO_SCRIPTS' | 'UNREADABLE'; message: string };

export function getScripts(path: string): Result<Record<string, string>, GetScriptsError> {
	const packagePath = join(path, 'package.json');
	const { fails, value } = xtry(() => readFileSync(packagePath));

	if(fails) {
		return err({ type: 'UNREADABLE', message: `couldn't read ${c.red('package.json')} (${c.cyan(packagePath)})` });
	}

	const scripts = JSON.parse(value.toString()).scripts as Record<string, string>;

	if(!scripts || Object.keys(scripts).length === 0) {
		return err({ type: 'NO_SCRIPTS', message: `package.json has no scripts (${c.cyan(packagePath)})` });
	}

	return ok(scripts);
}
