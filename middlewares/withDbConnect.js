import { connect, connection } from 'mongoose';

const withDbConnect = (handler) => async (req, res) => {
  // Check if we have a connection to the database
  if (connection.readyState === 0) {
    try {
      await connect(process.env.MONGODB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        useCreateIndex: true,
      });
    } catch (ex) {
      return res.status(500).json({
        error: true,
        message: 'Could not connect to database',
        details: ex.message,
      });
    }
  }

  return handler(req, res);
};

export default withDbConnect;
