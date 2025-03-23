import { xatry, xtry } from '@zokugun/xtry';
import { sync } from 'cross-spawn';
import enquirer from 'enquirer';
import { quit } from './quit.js';

export async function runScript(script: string, path: string, args: string[], confirm: boolean): Promise<void> {
	if(args.length > 0) {
		args.unshift('--');
	}

	if(confirm) {
		const { fails, value: response } = await xatry(enquirer.prompt<{ question: boolean }>({
			type: 'confirm',
			name: 'question',
			message: `npm run ${script} ${args.join(' ')}`,
		}));

		if(fails) {
			quit('Confirmation aborted');
		}

		if(!response.question) {
			return;
		}
	}

	const { fails, error } = xtry(() => sync('npm', ['run', script, ...args], {
		stdio: 'inherit',
		cwd: path,
	}));

	if(fails) {
		if(typeof error === 'string') {
			quit(error);
		}
		else {
			quit((error as Error).message);
		}
	}
}
