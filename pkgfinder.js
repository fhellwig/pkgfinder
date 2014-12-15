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

function getPackageInfo() {
    // Finds the package.json file and returns an object having the following
    // two properties: name and directory. The name property is the name from
    // the package.json file. The directory property is the location of the
    // package.json file.
    var initial = path.dirname(require.main.filename),
        current = initial,
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
    return {
        name: pkg.name,
        directory: current,
        resolve: function(p) {
            return path.resolve(this.directory, p);
        },
        isCurrent: current == process.cwd()
    };
}

module.exports = getPackageInfo;
