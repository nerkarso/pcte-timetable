require('dotenv').config({
  path: '.env.production',
});

const { deploy } = require('sftp-sync-deploy');

const config = {
  host: process.env.APP_HOST, // Required.
  port: process.env.APP_PORT, // Optional, Default to 22.
  username: process.env.APP_USERNAME, // Required.
  password: process.env.APP_PASSWORD, // Optional.
  localDir: process.env.APP_CLIENT_LOCAL_DIR, // Required, Absolute or relative to cwd.
  remoteDir: process.env.APP_CLIENT_REMOTE_DIR, // Required, Absolute path only.
};

const options = {
  dryRun: false, // Enable dry-run mode. Default to false
  exclude: [
    // Exclude patterns (glob)
    'img',
  ],
  excludeMode: 'ignore', // Behavior for excluded files ('remove' or 'ignore'), Default to 'remove'.
  forceUpload: false, // Force uploading all files, Default to false (upload only newer files).
  concurrency: 100, // Max number of SFTP tasks processed concurrently. Default to 100.
};

deploy(config, options)
  .then(() => {
    console.log('✅  Done');
  })
  .catch((err) => {
    console.error('⛔  [Error] ', err);
  });
