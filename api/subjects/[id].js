import withAllowedMethods from '../../middlewares/withAllowedMethods';
import withDbConnect from '../../middlewares/withDbConnect';
import SubjectModel from '../../models/SubjectModel';

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
 * Get a subject
 */
async function getOne(req, res) {
  try {
    const subject = await SubjectModel.findById(req.query.id);
    if (!subject) {
      return res.status(404).json({
        error: true,
        message: 'Subject does not exist',
      });
    }
    res.json({ subject });
  } catch (ex) {
    res.status(500).json({
      error: true,
      message: 'Could not get a subject',
      details: ex.message,
    });
  }
}

/**
 * Update a subject
 */
async function updateOne(req, res) {
  try {
    const subject = await SubjectModel.findByIdAndUpdate(req.query.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!subject) {
      return res.status(404).json({
        error: true,
        message: 'Subject does not exist',
      });
    }
    res.json({
      message: 'Subject updated',
      subject,
    });
  } catch (ex) {
    res.status(500).json({
      error: true,
      message: 'Could not update a subject',
      details: ex.message,
    });
  }
}

/**
 * Delete a subject
 */
async function deleteOne(req, res) {
  try {
    const result = await SubjectModel.deleteOne({ _id: req.query.id });
    res.json({
      count: result.deletedCount,
      message: `Subject deleted`,
    });
  } catch (ex) {
    res.status(500).json({
      error: true,
      message: 'Could not delete a subject',
      details: ex.message,
    });
  }
}
