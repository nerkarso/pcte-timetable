import formidable from 'formidable';
import xlsx from 'node-xlsx';
import withAllowedMethods from '../../middlewares/withAllowedMethods';
import withDbConnect from '../../middlewares/withDbConnect';
import ClassnameModel from '../../models/ClassnameModel';
import FacultyModel from '../../models/FacultyModel';
import SubjectModel from '../../models/SubjectModel';

export const config = {
  api: {
    bodyParser: false, // Disallow body parsing, consume as stream
  },
};

async function handler(req, res) {
  switch (req.method) {
    case 'POST':
      res.json({
        data: res.data,
      });
      break;
  }
}

export default withAllowedMethods(withDbConnect(withParseFormData(withExportData(handler))), ['POST']);

function withParseFormData(handler) {
  return (req, res) => {
    formidable().parse(req, (err, fields, files) => {
      if (err) {
        res.status(400).json({
          error: true,
          message: err.message,
        });
      } else {
        res.file = files.file;
        handler(req, res);
      }
    });
  };
}

function withExportData(handler) {
  return async (req, res) => {
    const data = {};
    try {
      const classnames = await ClassnameModel.find()
        .where('published')
        .equals(true)
        .sort({ name: 1 })
        .select('name -_id');
      const faculties = await FacultyModel.find().select('code name -_id');
      const subjects = await SubjectModel.find().select('code name color -_id');
      classnames.forEach((classname) => {
        data[classname.name] = exportClassSchedule({
          file: res.file,
          classname: classname.name,
          faculties,
          subjects,
        });
      });
    } catch (ex) {
      return res.status(500).json({
        error: true,
        message: 'Could not export class schedule',
        details: ex.message,
      });
    }
    res.data = data;
    handler(req, res);
  };
}

function exportClassSchedule({ file, classname, faculties, subjects }) {
  const [{ data }] = xlsx.parse(file.path);
  const dict = [...faculties, ...subjects];

  // Get the timeslots
  let timeslots = data[0];
  // Remove the first 2 columns
  timeslots.shift();
  timeslots.shift();
  // Remove empty columns
  timeslots = timeslots.filter(Boolean);

  // Filter classname
  let result = data.filter((row) => row[1] && row[1].toLowerCase() === classname.toLowerCase());

  // Replace values with dictionary
  result.forEach((row, rowIndex) => {
    row.forEach((colValue, colIndex) => {
      // Iterate through dictionary
      dict.forEach((dictItem) => {
        if (!colValue) return;
        const colCode = colValue.replace('-', '').trim();
        const dictCode = dictItem.code.replace('-', '');
        const regexp = new RegExp(dictCode, 'i');
        if (colCode.search(regexp) > -1) {
          result[rowIndex][colIndex] = dictItem;
        }
      });
    });
  });

  // Remove the first 2 columns
  result.map((row) => row.splice(0, 2));

  // Group lectures
  result = result.map((row) => {
    const limit = 3;
    let group = [];
    // Slice into groups of 3 and create a new array
    for (let i = 0, end = row.length / limit; i < end; ++i) {
      const sliced = row.slice(i * limit, (i + 1) * limit);
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
