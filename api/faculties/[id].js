import withAllowedMethods from '../../middlewares/withAllowedMethods';
import withDbConnect from '../../middlewares/withDbConnect';
import FacultyModel from '../../models/FacultyModel';

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
 * Get a faculty
 */
async function getOne(req, res) {
  try {
    const faculty = await FacultyModel.findById(req.query.id);
    if (!faculty) {
      return res.status(404).json({
        error: true,
        message: 'Faculty does not exist',
      });
    }
    res.json({ faculty });
  } catch (ex) {
    res.status(500).json({
      error: true,
      message: 'Could not get a faculty',
      details: ex.message,
    });
  }
}

/**
 * Update a faculty
 */
async function updateOne(req, res) {
  try {
    const faculty = await FacultyModel.findByIdAndUpdate(req.query.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!faculty) {
      return res.status(404).json({
        error: true,
        message: 'Faculty does not exist',
      });
    }
    res.json({
      message: 'Faculty updated',
      faculty,
    });
  } catch (ex) {
    res.status(500).json({
      error: true,
      message: 'Could not update a faculty',
      details: ex.message,
    });
  }
}

/**
 * Delete a faculty
 */
async function deleteOne(req, res) {
  try {
    const result = await FacultyModel.deleteOne({ _id: req.query.id });
    res.json({
      count: result.deletedCount,
      message: `Faculty deleted`,
    });
  } catch (ex) {
    res.status(500).json({
      error: true,
      message: 'Could not delete a faculty',
      details: ex.message,
    });
  }
}
