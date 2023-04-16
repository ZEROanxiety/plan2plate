const { connectToDatabase } = require('../lib/db');

export const getMeals = async () => {
  const db = await connectToDatabase();
  const meals = await db.collection('meals').find().toArray();
  return meals;
};

export const addMeal = async (meal) => {
  const db = await connectToDatabase();
  const result = await db.collection('meals').insertOne(meal);
  return result.insertedId;
};

export const deleteMeal = async (id) => {
  const db = await connectToDatabase();
  const result = await db.collection('meals').deleteOne({ _id: id });
  return result.deletedCount === 1;
};

export const updateMeal = async (id, meal) => {
  const db = await connectToDatabase();
  const result = await db.collection('meals').replaceOne({ _id: id }, meal);
  return result.modifiedCount === 1;
};
