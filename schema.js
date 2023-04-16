const { MongoClient } = require('mongodb');

const uri = 'mongodb://localhost:27017';
const client = new MongoClient(uri);

async function createSchema() {
  await client.connect();
  const database = client.db('plan2plate');
  const meals = database.collection('meals');
  await meals.createIndex({ userId: 1 });
  await client.close();
}

module.exports = createSchema;
