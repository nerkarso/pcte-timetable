require('dotenv').config({
  path: '.env.local',
});

const copyFiles = require('../lib/copy');

copyFiles(process.env.APP_CLIENT_SOURCE_DIR, process.env.APP_CLIENT_DEST_DIR);
