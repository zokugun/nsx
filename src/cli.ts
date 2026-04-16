import { Command } from '@zokugun/cli-utils/commander';
import pkg from '../package.json' with { type: 'json' };
import { run } from './run.js';

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
	.action(run);

program.parse();
