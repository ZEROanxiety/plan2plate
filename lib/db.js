const MongoClient = require('mongodb');
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/plan2plate', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true,
});

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB database');
});

const uri = 'mongodb+srv://tybrunson1993:Ainono2023@cluster0.bltoaju.mongodb.net/plan2plate?retryWrites=true&w=majority';

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

async function connectToDatabase() {
  try {
    await client.connect();
    const db = client.db();
    return db;
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
}

module.exports = { connectToDatabase };
