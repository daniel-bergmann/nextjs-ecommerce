import mongoose from 'mongoose';

const connection = {};

async function connect() {
  if (connection.isConnected) {
    console.log('already connected');
    return;
  }
  if (mongoose.connections.length > 0) {
    connection.isConnected = mongoose.connections[0].readyState;
    if (connection.isConnected === 1) {
      console.log('use previous connection');
      return;
    }
    await mongoose.disconnect();
  }
  const db = await mongoose.connect(process.env.MONGODB_URI, {
    //      mongoose version 6 and above don't require those code snippets below, kept here for later reference
    //      useNewUrlParser: true,
    //      useUnifiedTopology: true,
    //      useCreateIndex: true,
    //      useFindAndModify: false,
  });
  console.log('new connection');
  connection.isConnected = db.connections[0].readyState;
}

// in order for the code to work both in development and porduction mode.
// It would otherwise occupy the memory and processor

async function disconnect() {
  if (connection.isConnected) {
    if (process.env.NODE_ENV === 'production') {
      await mongoose.disconnect();
      connection.isConnected = false;
    } else {
      console.log('not disconnected');
    }
  }
}

const db = { connect, disconnect };
export default db;
