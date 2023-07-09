import mongoose from 'mongoose';
import path from 'path';

require("dotenv").config({ path: path.resolve(__dirname, "../../.env") });

function connect() {
  // Connecting to the database
  mongoose
    .connect(`${process.env.DB_CONNECT}`, {})
    .then(() => {
      console.log('Successfully connected to database');
    })
    .catch((error) => {
      console.log('database connection failed. exiting now...');
      console.error(error);
      process.exit(1);
    });
}

export default connect;
