import { exit } from 'node:process';
import c from 'ansi-colors';

export function quit(message: string): never {
	console.error(`${c.bgRed('ERROR:')} ${message}`);

	exit(1);
}
