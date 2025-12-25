import { xatry, xtry } from '@zokugun/xtry';
import { sync } from 'cross-spawn';
import enquirer from 'enquirer';
import { quit } from './quit.js';

export async function runScript(script: string, path: string, args: string[], confirm: boolean, continueOnError: boolean): Promise<void> {
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

	const result = xtry(() => sync('npm', ['run', script, ...args], {
		stdio: 'inherit',
		cwd: path,
	}));

	if(!continueOnError) {
		if(result.fails) {
			if(typeof result.error === 'string') {
				quit(result.error);
			}
			else {
				quit((result.error as Error).message);
			}
		}
		else if(result.value.status !== 0) {
			quit(`status: ${result.value.status}`);
		}
	}
}
