const copyFiles = require('../lib/copy');

const source = './dist';
const dest = '../src/data';

copyFiles(source, dest);
