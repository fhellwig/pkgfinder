/*
 * Copyright (c) 2014 Frank Hellwig
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to
 * deal in the Software without restriction, including without limitation the
 * rights to use, copy, modify, merge, publish, distribute, sublicense, and/or
 * sell copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
 * FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS
 * IN THE SOFTWARE.
 */

var path = require('path');

/**
 * Given an initial directory, finds the package.json file and returns an
 * object having the following four properties: name (string), directory
 * (string), resolve (function), and relative (function).
 *
 * The name is the name property from the package.json file. The directory
 * is the location of the package.json file. The resolve function and the
 * relative function are similar to their path module counterparts, using
 * the directory as their first argument.
 *
 * If no argument is supplied, the starting directory is the directory of
 * the require.main.filename property. If it is a module, then the directory
 * of the filename property is used. Finally, if it is a string, then that
 * string is assumed to be the starting directory.
 *
 * In all cases, if a package.json file is found in that directory, then it
 * is used. Otherwise, the parent directory is searched. The search for a
 * package.json file continues until the root directory is found.
 *
 * An exception is thrown if the package.json file is not found, cannot be
 * read, or does not have a name property.
 */
function pkgfinder(arg) {
    var initial;
    if (typeof arg === 'undefined') {
        initial = path.dirname(require.main.filename);
    } else if (typeof arg === 'object' && typeof arg.filename === 'string') {
        initial = path.dirname(arg.filename);
    } else if (typeof arg === 'string') {
        initial = arg;
    } else {
        throw new Error("Invalid argument (expected a module object or a string).");
    }
    var current = initial,
        pathname,
        pkg;
    while (true) {
        pathname = path.resolve(current, 'package.json');
        try {
            pkg = require(pathname);
            break;
        } catch (err) {
            if (err.code !== 'MODULE_NOT_FOUND') {
                throw err;
            }
        }
        var parent = path.resolve(current, '..');
        if (current == parent) {
            throw new Error("Cannot find 'package.json' in '" + initial + "' nor any of its parent directories.");
        }
        current = parent;
    }
    if (!pkg.name) {
        throw new Error("Cannot find property 'name' in '" + pathname + "'.");
    }
    var retval = {
        name: pkg.name,
        directory: current,
        resolve: function (p) {
            return path.resolve(current, p);
        },
        relative: function (p) {
            return path.relative(current, p);
        }
    }
    return retval;
}

module.exports = pkgfinder;

if (!module.parent) {
    var pkg = pkgfinder();
    console.log("              name: " + pkg.name);
    console.log("         directory: " + pkg.directory);
    console.log(" resolve('config'): " + pkg.resolve('config'));
    console.log("relative('config'): " + pkg.relative('config'));
}
