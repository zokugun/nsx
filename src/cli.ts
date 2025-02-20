import { resolve } from 'path';
import { exit } from 'process';
import { bgRed } from 'ansi-colors';
import { Command } from 'commander';
import enquirer from 'enquirer';
import pkg from '../package.json';
import { getScripts } from './utils/get-scripts.js';
import { matchQuery } from './utils/match-query.js';
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
	.action(async (query: string, arguments_: string[], options: { confirm: boolean; path: string; separator: string }) => {
		const path = resolve(options.path);

		try {
			const scripts = getScripts(path);
			let matches: string[];

			if(query) {
				if(scripts[query]) {
					await runScript(query, path, arguments_, options.confirm);

					return;
				}

				const shortenedScripts = shortenScripts(scripts, options.separator);

				matches = matchQuery(scripts, shortenedScripts, query);

				if(matches.length === 1) {
					await runScript(matches[0], path, arguments_, options.confirm);

					return;
				}
			}
			else {
				matches = Object.keys(scripts);
			}

			const response = await enquirer.prompt<{ script: string }>({
				type: 'select',
				name: 'script',
				message: 'Pick a script',
				choices: matches,
			});

			if(response.script) {
				await runScript(response.script, path, arguments_, false);
			}
		}
		catch (error) {
			if(typeof error === 'string') {
				console.error(`${bgRed('ERROR:')} ${error}`);
			}
			else {
				console.error(`${bgRed('ERROR:')} ${(error as Error).message}`);
			}

			exit(1);
		}
	});

program.parse();
