import { resolve } from 'path';
import { exit } from 'process';
import { stringifyError, xatry } from '@zokugun/xtry';
import c from 'ansi-colors';
import { Command } from 'commander';
import enquirer from 'enquirer';
import pkg from '../package.json' with { type: 'json' };
import { getScripts } from './utils/get-scripts.js';
import { matchQuery } from './utils/match-query.js';
import { parseQuery } from './utils/parse-query.js';
import { quit } from './utils/quit.js';
import { runParallel } from './utils/run-parallel.js';
import { runScript } from './utils/run-script.js';
import { shortenScripts } from './utils/shorten-scripts.js';

const DEFAULT_SEPARATOR = /[:-]/;

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
	.option('-s, --separator <separator>', 'The separator for shortened alias.', ':-')
	.action(async (query: string, args: string[], options: { confirm: boolean; path: string; separator: string }) => {
		const path = resolve(options.path);
		const { fails, value: scripts, error } = getScripts(path);

		if(fails) {
			quit(error.message);
		}

		let matches: string[];

		if(query) {
			const { fails, value: requests, error } = parseQuery(query);

			if(fails) {
				quit(error.message);
			}

			if(requests.length === 1) {
				const request = requests[0];

				if(scripts[request.query]) {
					await runScript(request.query, path, args, options.confirm, false);

					return;
				}

				const separator = options.separator === ':-' ? DEFAULT_SEPARATOR : new RegExp(`[${options.separator}]`);
				const shortenedScripts = shortenScripts(scripts, separator);

				matches = matchQuery(scripts, shortenedScripts, request.query);

				if(matches.length === 0) {
					quit('No scripts matched!');
				}
				else if(matches.length === 1) {
					await runScript(matches[0], path, [...request.args, ...args], options.confirm, false);

					return;
				}
				else {
					quit(`Multiple matches for ${c.red(request.query)}!`);
				}
			}
			else {
				const separator = options.separator === ':-' ? DEFAULT_SEPARATOR : new RegExp(`[${options.separator}]`);
				const shortenedScripts = shortenScripts(scripts, separator);

				for(const request of requests) {
					if(scripts[request.query]) {
						request.script = request.query;
					}
					else {
						const matches = matchQuery(scripts, shortenedScripts, request.query);

						if(matches.length === 0) {
							quit(`No match for ${c.red(request.query)}!`);
						}
						else if(matches.length === 1) {
							request.script = matches[0];
						}
						else {
							quit(`Multiple matches for ${c.red(request.query)}!`);
						}
					}
				}

				if(requests[0].type === 'parallel') {
					const procs = requests.map(async (request) => runParallel(request.script!, path, [...request.args, ...args]));
					const results = await Promise.all(procs);

					const error = false;

					for(const [i, response] of results.entries()) {
						const request = requests[i];

						if(response.error) {
							console.error(`${c.bgRed('ERROR')} (${request.script}) error: ${stringifyError(response.error)}`);
						}
						else if(response.code === 0) {
							console.error(`SUCCESS (${request.script})`);
						}
						else {
							console.error(`${c.bgRed('ERROR')} (${request.script}) status: ${response.code}`);
						}
					}

					if(error) {
						exit(1);
					}

					return;
				}
				else {
					for(const request of requests) {
						await runScript(request.script!, path, [...request.args, ...args], false, request.continueOnError);
					}

					return;
				}
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
			await runScript(response.script, path, args, false, false);
		}
		else {
			quit('No script selected');
		}
	});

program.parse();
