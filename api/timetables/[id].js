import withAllowedMethods from '../../middlewares/withAllowedMethods';
import withDbConnect from '../../middlewares/withDbConnect';
import TimetableModel from '../../models/TimetableModel';

async function handler(req, res) {
  switch (req.method) {
    case 'GET':
      getOne(req, res);
      break;
    case 'PATCH':
      updateOne(req, res);
      break;
    case 'DELETE':
      deleteOne(req, res);
      break;
  }
}

export default withAllowedMethods(withDbConnect(handler), ['GET', 'POST', 'PATCH', 'DELETE']);

/**
 * Get a timetable
 */
async function getOne(req, res) {
  try {
    const timetable = await TimetableModel.findById(req.query.id);
    if (!timetable) {
      return res.status(404).json({
        error: true,
        message: 'Timetable does not exist',
      });
    }
    res.json({ timetable });
  } catch (ex) {
    res.status(500).json({
      error: true,
      message: 'Could not get a timetable',
      details: ex.message,
    });
  }
}

/**
 * Update a timetable
 */
async function updateOne(req, res) {
  try {
    const timetable = await TimetableModel.findByIdAndUpdate(req.query.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!timetable) {
      return res.status(404).json({
        error: true,
        message: 'Timetable does not exist',
      });
    }
    res.json({
      message: 'Timetable updated',
      timetable,
    });
  } catch (ex) {
    res.status(500).json({
      error: true,
      message: 'Could not update a timetable',
      details: ex.message,
    });
  }
}

/**
 * Delete a timetable
 */
async function deleteOne(req, res) {
  try {
    const result = await TimetableModel.deleteOne({ _id: req.query.id });
    res.json({
      count: result.deletedCount,
      message: `Timetable deleted`,
    });
  } catch (ex) {
    res.status(500).json({
      error: true,
      message: 'Could not delete a timetable',
      details: ex.message,
    });
  }
}
