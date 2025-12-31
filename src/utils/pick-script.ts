import { xatry } from '@zokugun/xtry';
import enquirer from 'enquirer';
import { quit } from './quit.js';
import { runScript } from './run-script.js';

export async function pickScript(matches: string[], path: string, args: string[]): Promise<void> {
	const { value: response } = await xatry(enquirer.prompt<{ script: string }>({
		type: 'select',
		name: 'script',
		message: 'Pick a script',
		choices: matches,
	}));

	if(response?.script) {
		await runScript(response.script, path, args, false, false);
	}
	else {
		quit('No script selected');
	}
}
