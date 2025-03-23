import { resolve } from 'path';
import { xatry } from '@zokugun/xtry';
import { Command } from 'commander';
import enquirer from 'enquirer';
import pkg from '../package.json' with { type: 'json' };
import { getScripts } from './utils/get-scripts.js';
import { matchQuery } from './utils/match-query.js';
import { quit } from './utils/quit.js';
import { runScript } from './utils/run-script.js';
import { shortenScripts } from './utils/shorten-scripts.js';

const program = new Command();

program
	.version(pkg.version, '-v, --version')
	.description(pkg.description)
	.argument('[query]')
	.argument('[args...]')
	.passThroughOptions()
	.enablePositionalOptions()
	.option('-c, --confirm', 'Confirm before running the selected script.', false)
	.option('-p, --path <path>', 'Path to the folder containing package.json.', '.')
	.option('-s, --separator <separator>', 'The separator for shortened alias.', ':')
	.action(async (query: string, args: string[], options: { confirm: boolean; path: string; separator: string }) => {
		const path = resolve(options.path);
		const { fails, value: scripts, error } = getScripts(path);

		if(fails) {
			quit(error.message);
		}

		let matches: string[];

		if(query) {
			if(scripts[query]) {
				await runScript(query, path, args, options.confirm);

				return;
			}

			const shortenedScripts = shortenScripts(scripts, options.separator);

			matches = matchQuery(scripts, shortenedScripts, query);

			if(matches.length === 0) {
				quit('No scripts matched!');
			}
			else if(matches.length === 1) {
				await runScript(matches[0], path, args, options.confirm);

				return;
			}
		}
		else {
			matches = Object.keys(scripts);
		}

		const { value: response } = await xatry(enquirer.prompt<{ script: string }>({
			type: 'select',
			name: 'script',
			message: 'Pick a script',
			choices: matches,
		}));

		if(response?.script) {
			await runScript(response.script, path, args, false);
		}
		else {
			quit('No script selected');
		}
	});

program.parse();
