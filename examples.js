'use strict';

const pkgfinder = require('./pkgfinder');
const pkg = pkgfinder();

console.log('name:', pkg.name);
console.log('version:', pkg.version);
console.log('description:', pkg.prop('description'));
try {
  console.log(pkg.prop('nosuchprop'));
} catch (err) {
  console.error('expected error:', err.message);
}
console.log('directory:', pkg.directory);
console.log('relative(process.env.HOME):', pkg.relative(process.env.HOME));
console.log('resolve("mydir"):', pkg.resolve('mydir'));
console.log('iisnode:', pkgfinder.iisnode);
