import withAllowedMethods from '../../middlewares/withAllowedMethods';
import withDbConnect from '../../middlewares/withDbConnect';
import TimetableModel from '../../models/TimetableModel';

async function handler(req, res) {
  switch (req.method) {
    case 'GET':
      getAll(req, res);
      break;
    case 'POST':
      createOne(req, res);
      break;
  }
}

export default withAllowedMethods(withDbConnect(handler), ['GET', 'POST', 'PATCH', 'DELETE']);

/**
 * Get all timetables
 */
async function getAll(req, res) {
  try {
    const timetables = await TimetableModel.find().sort({ date: -1 });
    return res.json({ count: timetables.length, timetables });
  } catch (ex) {
    return res.status(500).json({
      error: true,
      message: 'Could not get all timetables',
      details: ex.message,
    });
  }
}

/**
 * Create a timetable
 */
async function createOne(req, res) {
  try {
    const timetable = await TimetableModel.create(req.body);
    res.status(201).json({
      message: 'Timetable created',
      timetable,
    });
  } catch (ex) {
    return res.status(500).json({
      error: true,
      message: 'Could not create a timetable',
      details: ex.message,
    });
  }
}
