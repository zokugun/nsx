[@zokugun/nsx](https://github.com/zokugun/nsx)
==========================================================

[![MIT licensed](https://img.shields.io/badge/license-MIT-blue.svg)](./LICENSE)
[![NPM Version](https://img.shields.io/npm/v/@zokugun/nsx.svg?colorB=green)](https://www.npmjs.com/package/@zokugun/nsx)
[![Donation](https://img.shields.io/badge/donate-ko--fi-green)](https://ko-fi.com/daiyam)
[![Donation](https://img.shields.io/badge/donate-liberapay-green)](https://liberapay.com/daiyam/donate)
[![Donation](https://img.shields.io/badge/donate-paypal-green)](https://paypal.me/daiyam99)

`nsx` is command-line interface which allows you to run a npm script by:
- its full name (`compile`);
- the first letters (`comp` for `compile`);
- a shortened alias (`bd` for `build:dev`).

If the name can't be matched to a single script, a prompt will asked you to desired script to run.

You can pass arguments to the script without any additional `--`.

Install
-------

With [node](http://nodejs.org) previously installed:

	npm install @zokugun/nsx

Usage
-----

```bash
nsx l --fix # run: npm lint -- --fix
```

Options
-------

| Option              | Default | Description                                   |
| ------------------- | ------- | --------------------------------------------- |
| `-c`, `--confirm`   | `false` | Confirm before running the selected script.   |
| `-p`, `--path`      | `"."`   | Path to the folder containing `package.json`. |
| `-s`, `--separator` | `":"`   | The separator for shortened alias.            |

Syntax (short, alias, and matching)
----------------------------------

nsx supports several handy ways to refer to scripts:

- Full name: call the script by its full npm script name.
    - `nsx compile` runs the `compile` script.
- Prefix matching: type the first letters of the script name.
    - `nsx comp` can match `compile` if it's unambiguous.
- Shortened alias: an alias composed of the first letter of each part of the script name (parts are split by a separator).
    - By default the separator includes `:` and `-` (for example `build:dev` → `bd`).
    - The `-s, --separator` option lets you change which characters are considered separators for alias generation.
    - **Example**: `nsx bd` matches `build:dev` when the alias `bd` is unique.
- Special patterns supported for matching:
    - `a..z` (four characters with two dots): matches scripts starting with `a` and ending with `z`.
    - `foo#bar#baz` (hash `#` used between fragments): treated as `foo.*bar.*baz` and matched anywhere in the script name.

Running in series and parallel
------------------------------

You can run a single script, a sequence of scripts (serie), or multiple scripts in parallel.

### Series (run one after the other)

Separate requests with a comma `,`.

**Examples:**

- `nsx build,lint,test`
- `nsx b,l,t`
- `nsx "build --prod,lint --fix"` (each request can have its own arguments)
- `nsx b,'l --fix'`

Use a trailing `$` on a request to continue to the next request even if that request fails, for example:

- `nsx "build$,lint"` (if `build` fails the serie continues to `lint`)

### Parallel (run at the same time)

Separate requests with a plus `+`.

**Examples:**

- `nsx build+test`
- `nsx b+t`
- `nsx "build --prod+test --watch"`
- `nsx b+'test --watch'`

When running in parallel, each script is started concurrently and their results are reported individually.

### Arguments and quoting:

When using multiple requests or arguments containing spaces, quote the whole query so the shell passes it as a single argument.

**Examples:**

- `nsx "build --prod,lint --fix"`
- `nsx "build --prod+test --watch"`

These matching rules make it quick to run scripts using short forms, aliases, and combined series/parallel requests.

Donations
---------

Support this project by becoming a financial contributor.

<table>
    <tr>
        <td><img src="https://raw.githubusercontent.com/daiyam/assets/master/icons/256/funding_kofi.png" alt="Ko-fi" width="80px" height="80px"></td>
        <td><a href="https://ko-fi.com/daiyam" target="_blank">ko-fi.com/daiyam</a></td>
    </tr>
    <tr>
        <td><img src="https://raw.githubusercontent.com/daiyam/assets/master/icons/256/funding_liberapay.png" alt="Liberapay" width="80px" height="80px"></td>
        <td><a href="https://liberapay.com/daiyam/donate" target="_blank">liberapay.com/daiyam/donate</a></td>
    </tr>
    <tr>
        <td><img src="https://raw.githubusercontent.com/daiyam/assets/master/icons/256/funding_paypal.png" alt="PayPal" width="80px" height="80px"></td>
        <td><a href="https://paypal.me/daiyam99" target="_blank">paypal.me/daiyam99</a></td>
    </tr>
</table>

License
-------

Copyright &copy; 2025-present Baptiste Augrain

Licensed under the [MIT license](https://opensource.org/licenses/MIT).
