import { spawn } from 'cross-spawn';

export async function runParallel(script: string, path: string, args: string[]): Promise<{ script: string; code: number | null; error?: any }> {
	if(args.length > 0) {
		args.unshift('--');
	}

	return new Promise((resolve) => {
		const child = spawn('npm', ['run', script, ...args], {
			cwd: path,
			stdio: 'inherit',
		});

		child.on('close', (code) => resolve({ script, code }));
		child.on('error', (error) => resolve({ script, code: null, error }));
	});
}
