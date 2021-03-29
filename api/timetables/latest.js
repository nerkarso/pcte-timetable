import withAllowedMethods from '../../middlewares/withAllowedMethods';
import withDbConnect from '../../middlewares/withDbConnect';
import ClassnameModel from '../../models/ClassnameModel';
import TimetableModel from '../../models/TimetableModel';

async function handler(req, res) {
  switch (req.method) {
    case 'GET':
      getLatest(req, res);
      break;
  }
}

export default withAllowedMethods(withDbConnect(handler), ['GET']);

/**
 * Get the latest timetable
 */
async function getLatest(req, res) {
  try {
    const timetable = await TimetableModel.findOne().where('published').equals(true).sort({ date: -1 });
    const classnames = await ClassnameModel.find().where('published').equals(true).sort({ name: 1 }).select('name');
    res.json({
      date: timetable.date,
      classnames: classnames,
      timetable: timetable.data,
    });
  } catch (ex) {
    res.status(500).json({
      error: true,
      message: 'Could not get the latest timetable',
      details: ex.message,
    });
  }
}
