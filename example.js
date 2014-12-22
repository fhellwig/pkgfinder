var pkgfinder = require('./pkgfinder');
console.log('name: %s', pkgfinder.name);
console.log('directory: %s', pkgfinder.directory);
console.log('resolve: %s', pkgfinder.resolve('data'));
console.log('isCurrent: %s', pkgfinder.isCurrent());
