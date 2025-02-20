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
nsx l --fix

# npm lint -- --fix
```

Options
-------

| Option              | Default | Description                                   |
| ------------------- | ------- | --------------------------------------------- |
| `-c`, `--confirm`   | `false` | Confirm before running the selected script.   |
| `-p`, `--path`      | `"."`   | Path to the folder containing `package.json`. |
| `-s`, `--separator` | `":"`   | The separator for shortened alias.            |

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
