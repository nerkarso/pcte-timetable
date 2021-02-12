const fs = require('fs');
const xlsx = require('node-xlsx').default;

/**
 * Save JSON
 *
 * @param {*} filePath
 * @param {*} content
 */
function saveJson(filePath, content) {
  const handleCallback = (error) => {
    if (error) {
      console.log('⛔  Error', error);
    } else {
      console.log('✅  Finished Exporting.');
    }
  };

  const fileContent = JSON.stringify(content, null, 2);

  fs.writeFile(filePath, fileContent, handleCallback);
}

/**
 * Find sheet
 *
 * @param {*} dirPath
 */
function findSheet(dirPath) {
  const files = fs.readdirSync(dirPath);
  const result = files.filter((file) => file.search(/\.xlsx$/g) > -1);

  return result;
}

/**
 * Export sheet
 *
 * @param {*} filePath
 */
function exportSheet(filePath) {
  const data = xlsx.parse(filePath);

  return data;
}

/**
 * Export all classnames.
 *
 * @param {*} filePath
 */
function exportClassNames(filePath) {
  const [{ data }] = xlsx.parse(filePath);

  // Remove the first element.
  data.splice(0, 1);

  // Get the second element of the array.
  let result = data.map((arr) => arr[1]);

  // Remove duplicates.
  result = Array.from(new Set(result));

  // Filter impurities.
  result = result.filter((value) => value != null && value !== 'Class');

  // Sort
  result = result.sort();

  return result;
}

/**
 * Export a single class.
 *
 * @param {*} classname
 * @param {*} filePath
 * @param {*} dictionary
 */
function exportClass(classname, filePath, { faculty, subjects, timeslots }) {
  const [{ data }] = xlsx.parse(filePath);
  const dict = [...faculty, ...subjects];

  // Filter classname.
  let result = data.filter((arr) => {
    if (!arr[1]) return;

    return arr[1].toLowerCase() === classname.toLowerCase();
  });

  // Replace values with dictionary.
  result.map((x, xIndex) => {
    x.map((y, yIndex) => {
      // Iterate through dictionary.
      for (const dictValue of dict) {
        if (!y) return;

        if (y.replace('-', '').toLowerCase() === dictValue.code.replace('-', '').toLowerCase()) {
          result[xIndex][yIndex] = dictValue;
        }
      }
    });
  });

  // Remove the first 2 elements.
  result.map((arr) => arr.splice(0, 2));

  // Group lectures.
  result = result.map((arr) => {
    const limit = 3;
    let group = [];

    // Slice into groups of 3 and create a new array.
    for (let i = 0, end = arr.length / limit; i < end; ++i) {
      const sliced = arr.slice(i * limit, (i + 1) * limit);

      group.push({
        timeslot: timeslots[i],
        subject: sliced[0] || null,
        faculty: sliced[1] || null,
        room: sliced[2] || null,
      });
    }

    return group;
  });

  return result;
}

module.exports = {
  exportClass,
  exportClassNames,
  exportSheet,
  findSheet,
  saveJson,
};
