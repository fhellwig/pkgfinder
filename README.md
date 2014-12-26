# pkgfinder

Finds the package descriptor file of a node.js application.

## Overview

Given a node.js application, finds the `package.json` file.

```javascript
var pkgfinder = require('pkgfinder');
var pkg = pkgfinder();
```

The returned `pkg` object has the following four properties:

- `name`: {string} the name property from the `package.json` file
- `directory`: {string} the application directory containing the `package.json` file
- `resolve`: {function} resolves the specified argument against the application directory
- `relative`: {function} returns the relative path of the argument with respect to the application directory

Executing `node pkgfinder` will run an example.

## Rationale

Utility packages often care about the application in which they are used rather
than their own environment. For example, a configuration manager may look for
an `config` subdirectory in the top-level application directory. This has
nothing to do with the configuration manager's location in the `node_module`
tree and may not even have anything to do with the parent module, which could
be in a `lib` subdirectory.

## Algorithm

1. Determine the main entry point of the application from `require.main.filename`.
2. Determine the directory of this module using the `path.dirname` function.
3. Attempt to load the `package.json` file in this directory.
4. If no `package.json` file is found, seach successive parent directories.
5. Return the package name and the directory if found. Otherwise, throw an exception.

## License

(The MIT License)

	Copyright (c) 2014 Frank Hellwig

	Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

	The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

	THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
