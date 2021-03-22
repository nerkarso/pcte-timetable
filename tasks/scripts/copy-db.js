const fs = require('fs-extra');

const source = './dist/db.json';
const dest = '../src/data/db.json';

async function copyFile() {
  try {
    await fs.copy(source, dest);
    console.log('✅  Copied');
  } catch (ex) {
    console.error(`⛔  ${ex.message}`);
  }
}

copyFile();
