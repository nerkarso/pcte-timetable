import withAllowedMethods from '../../middlewares/withAllowedMethods';
import withDbConnect from '../../middlewares/withDbConnect';
import ClassnameModel from '../../models/ClassnameModel';

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
 * Get a classname
 */
async function getOne(req, res) {
  try {
    const classname = await ClassnameModel.findById(req.query.id);
    if (!classname) {
      return res.status(404).json({
        error: true,
        message: 'Classname does not exist',
      });
    }
    res.json({ classname });
  } catch (ex) {
    res.status(500).json({
      error: true,
      message: 'Could not get a classname',
      details: ex.message,
    });
  }
}

/**
 * Update a classname
 */
async function updateOne(req, res) {
  try {
    const classname = await ClassnameModel.findByIdAndUpdate(req.query.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!classname) {
      return res.status(404).json({
        error: true,
        message: 'Classname does not exist',
      });
    }
    res.json({
      message: 'Classname updated',
      classname,
    });
  } catch (ex) {
    res.status(500).json({
      error: true,
      message: 'Could not update a classname',
      details: ex.message,
    });
  }
}

/**
 * Delete a classname
 */
async function deleteOne(req, res) {
  try {
    const result = await ClassnameModel.deleteOne({ _id: req.query.id });
    res.json({
      count: result.deletedCount,
      message: `Classname deleted`,
    });
  } catch (ex) {
    res.status(500).json({
      error: true,
      message: 'Could not delete a classname',
      details: ex.message,
    });
  }
}
