import withAllowedMethods from '../../middlewares/withAllowedMethods';
import withDbConnect from '../../middlewares/withDbConnect';
import FacultyModel from '../../models/FacultyModel';

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
 * Get all faculties
 */
async function getAll(req, res) {
  try {
    const faculties = await FacultyModel.find();
    return res.json({ count: faculties.length, faculties });
  } catch (ex) {
    return res.status(500).json({
      error: true,
      message: 'Could not get all faculties',
      details: ex.message,
    });
  }
}

/**
 * Create a faculty
 */
async function createOne(req, res) {
  try {
    const faculty = await FacultyModel.create(req.body);
    res.status(201).json({
      message: 'Faculty created',
      faculty,
    });
  } catch (ex) {
    return res.status(500).json({
      error: true,
      message: 'Could not create a faculty',
      details: ex.message,
    });
  }
}
