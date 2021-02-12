const path = require('path');
const { exportClass, exportClassNames, exportSheet, findSheet, saveJson } = require('./lib/xlsx-json');

// Database
const faculty = require('./data/db/faculty.json');
const subjects = require('./data/db/subjects.json');
const weekdays = require('./data/db/weekdays.json');
const timeslots = require('./data/db/timeslots.json');

// Variables
const xlsxDir = './data/xlsx';
const xlsxFiles = findSheet(xlsxDir);
const xlsxFile = xlsxFiles[0];
if (!xlsxFile) {
  return console.log('⛔  No xlsx file found.');
}
const xlsxPath = path.join(xlsxDir, xlsxFile);
const classNames = require('./dist/classnames.json');

/**
 * Extract Date
 */
function extractDate() {
  const result = xlsxFile.split(' - ');
  return result[1].replace('.xlsx', '');
}

/**
 * Handle Export Sheet
 */
function handleExportSheet() {
  const result = exportSheet(xlsxPath);
  saveJson(path.join('dist', 'sheet.json'), result);
}

/**
 * Handle Export Classnames
 */
function handleExportClassNames() {
  const result = exportClassNames(xlsxPath);
  saveJson(path.join('dist', 'classnames.json'), result);
}

/**
 * Handle Export Class
 */
function handleExportClass() {
  let schedule = {};

  console.log(`✅  ${xlsxFile}`);

  classNames.map((className) => {
    schedule[className] = exportClass(className, xlsxPath, {
      faculty: faculty,
      subjects: subjects,
      timeslots: timeslots,
    });
  });

  saveJson(path.join('dist', 'db.json'), {
    classNames,
    date: extractDate(),
    weekdays: weekdays,
    schedule: schedule,
  });
}

// handleExportSheet();
// handleExportClassNames();
handleExportClass();
