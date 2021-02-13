import withAllowedMethods from '../../middlewares/withAllowedMethods';
import withDbConnect from '../../middlewares/withDbConnect';
import SubjectModel from '../../models/SubjectModel';

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
 * Get all subjects
 */
async function getAll(req, res) {
  try {
    const subjects = await SubjectModel.find();
    return res.json({ count: subjects.length, subjects });
  } catch (ex) {
    return res.status(500).json({
      error: true,
      message: 'Could not get all subjects',
      details: ex.message,
    });
  }
}

/**
 * Create a subject
 */
async function createOne(req, res) {
  try {
    const subject = await SubjectModel.create(req.body);
    res.status(201).json({
      message: 'Subject created',
      subject,
    });
  } catch (ex) {
    return res.status(500).json({
      error: true,
      message: 'Could not create a subject',
      details: ex.message,
    });
  }
}
