# pkgfinder

Finds the package descriptor file of a node.js application.

## Overview

Given a node.js application, finds the `package.json` file.

```javascript
const pkgfinder = require('pkgfinder');

// The pkgfinder returned from require() is a funtion that must be called
// returning a pkg object that provides three properties and three functions.

const pkg = pkgfinder();
```

### Properties

- `pkg.name`: {string} the name property from the `package.json` file
- `pkg.version`: {string} the version property from the `package.json` file
- `pkg.directory`: {string} the application directory containing the `package.json` file

### Functions

- `pkg.prop(propname)`: {function} returns the value of an arbitrary `package.json` property
- `pkg.resolve([...paths])`: {function} resolves the specified argument(s) against the application directory
- `pkg.relative(to)`: {function} returns the relative path of the argument with respect to the application directory

Please see the `examples.js` file for sample usage.

## Details

Calling `require('pkgfinder')` returns a single `pkgfinder` function.

```javascript
pkgfinder([module]);
```

The `module` parameter is optional. If it is supplied, then it must be a module object. If the `module` parameter is not specified, then the initial directory is the directory of the `require.main.filename` property. If the `module` parameter is specified, then the initial directory is the directory of the module's `filename` property.

A special exception to this is if `require.main` contains the string `iisnode`. In that case, we are probably running on Microsoft Azure and use the current working directory as the initial directory. A boolean flag indicating this is available on the exported module function as `pkgfinder.iisnode`. (Please note that this property is on the `pkgfinder` function itself and not on the returned `pkg` object.)

In both cases, if a `package.json` file is found in that directory, then it is used. Otherwise, the parent directory is searched. The search for a `package.json` file continues until the root directory is found.

In most cases, the following will give you the desired results:

```javascript
const pkgfinder = require('pkgfinder');
const pkg = pkgfinder();

// Equivalent to:
// const pkg = require('pkgfinder')();

console.log(pkg.name);
console.log(pkg.version);
console.log(pkg.directory);
```

Given an initial directory, the `pkgfinder` function finds the `package.json` file and returns an object having the following six properties: `name` {string}, `version` {string}, `directory` {string}, `prop` {function}, `resolve` {function}, and `relative` {function}.

The `name` and `version` are the `name` and `version` properties from the `package.json` file. The `directory` is the location of the `package.json` file. The `prop` function returns an arbitrary property value. The `resolve` function and the `relative` function are similar to their `path` module counterparts, using the `directory` as their first argument.

An exception is thrown if the `package.json` file is not found, cannot be read, or does not have a `name` property.

## Rationale

Utility packages often care about the application in which they are used rather than their own environment. For example, a configuration manager may look for an `config` subdirectory in the top-level application directory. This has nothing to do with the configuration manager's location in the `node_module` tree and may not even have anything to do with the parent module, which could be in a `lib` subdirectory.

## Algorithm

1.  Determine the main entry point of the application from `require.main.filename`.
2.  Determine the directory of this module using the `path.dirname` function.
3.  Attempt to load the `package.json` file in this directory.
4.  If no `package.json` file is found, seach successive parent directories.
5.  Return the `pkg` object if found. Otherwise, throw an exception.

## License

(The MIT License)

Copyright (c) 2020 Frank Hellwig

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
