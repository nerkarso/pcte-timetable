import withAllowedMethods from '../../middlewares/withAllowedMethods';
import withDbConnect from '../../middlewares/withDbConnect';
import ClassnameModel from '../../models/ClassnameModel';

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
 * Get all classnames
 */
async function getAll(req, res) {
  try {
    const classnames = await ClassnameModel.find().sort({ name: 1 });
    return res.json({ count: classnames.length, classnames });
  } catch (ex) {
    return res.status(500).json({
      error: true,
      message: 'Could not get all classnames',
      details: ex.message,
    });
  }
}

/**
 * Create a classname
 */
async function createOne(req, res) {
  try {
    const classname = await ClassnameModel.create(req.body);
    res.status(201).json({
      message: 'Classname created',
      classname,
    });
  } catch (ex) {
    return res.status(500).json({
      error: true,
      message: 'Could not create a classname',
      details: ex.message,
    });
  }
}
