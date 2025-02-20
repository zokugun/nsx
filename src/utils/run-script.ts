import { sync } from 'cross-spawn';
import enquirer from 'enquirer';

export async function runScript(script: string, path: string, arguments_: string[], confirm: boolean) {
	if(arguments_.length > 0) {
		arguments_.unshift('--');
	}

	if(confirm) {
		const response = await enquirer.prompt<{ question: boolean }>({
			type: 'confirm',
			name: 'question',
			message: `npm run ${script} ${arguments_.join(' ')}`,
		});

		if(!response.question) {
			return;
		}
	}

	sync('npm', ['run', script, ...arguments_], {
		stdio: 'inherit',
		cwd: path,
	});
}
