import { useState } from 'react';
import Layout from '../components/Layout';
import MealPlan from '../components/MealPlan';
import MealCard from '../components/MealCard';
import { getMeals } from '../utils/api';

const { connectDb } = require('./db');

async function start() {
  await connectDb();
  console.log('App started');
}

const express = require('express');
const mongoose = require('mongoose');

const app = express();
const port = process.env.PORT || 3000;

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/plan2plate', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Error connecting to MongoDB', err));

// Start the server
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

start();

const Index = () => {
  const [selectedMeals, setSelectedMeals] = useState([]);

  const handleAddMeal = (meal) => {
    setSelectedMeals([...selectedMeals, meal]);
  };

  return (
    <Layout>
      <div className="container">
        <h1 className="title">Welcome to Plan2Plate!</h1>
        <p className="description">Start planning your meals and saving money today.</p>
        <MealPlan meals={meals} onAddMeal={handleAddMeal} />
        <div className="meal-cards-container">
          {meals.map((meal) => (
            <MealCard key={meal.id} meal={meal} onAddMeal={handleAddMeal} />
          ))}
        </div>
      </div>
      <style jsx>{`
        .container {
          max-width: 800px;
          margin: 0 auto;
          padding: 0 20px;
        }
        .title {
          font-size: 3rem;
          margin-top: 3rem;
          color: #fff;
          text-align: center;
        }
        .description {
          font-size: 1.5rem;
          margin-top: 1.5rem;
          color: #ccc;
          text-align: center;
        }
        .meal-cards-container {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          margin-top: 3rem;
        }
      `}</style>
    </Layout>
  );
};

Index.getInitialProps = async () => {
  const meals = await getMeals();
  return { meals };
};

app.get('/', (req, res) => {
  res.send('Welcome to Plan2Plate!');
});

export default Index;

