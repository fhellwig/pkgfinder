var pkgfinder = require('./pkgfinder');
var pkg = pkgfinder();
console.log('name: %s', pkg.name);
console.log('directory: %s', pkg.directory);
console.log('resolve: %s', pkg.resolve('data'));
console.log('isCurrent: %s', pkg.isCurrent);