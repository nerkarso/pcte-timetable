const fs = require('fs-extra');

/**
 * Copy Local
 * @param {*} source
 * @param {*} destination
 */
async function copyFiles(source, destination) {
  try {
    // Empty the destination directory.
    await fs.emptyDir(destination);
    console.log('✅  Cleared');

    // Copy from source to destination.
    await fs.copy(source, destination);
    console.log('✅  Copied');
  } catch (error) {
    console.error(error);
  }
}

module.exports = copyFiles;
