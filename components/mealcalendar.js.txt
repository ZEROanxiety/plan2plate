import React from 'react';
import { useState } from 'react';
import Layout from '../components/Layout';
import MealPlan from '../components/MealPlan';
import { getMeals } from '../utils/api';
import { MealCard } from '../components/MealCard';
import Upload from './upload';

const MealCalendar = ({ meals }) => {
  const [selectedMeals, setSelectedMeals] = useState([]);

  const handleAddMeal = (meal) => {
    setSelectedMeals([...selectedMeals, meal]);
  };

  return (
    <Layout>
      <Upload />
      <MealPlan meals={selectedMeals} onAddMeal={handleAddMeal} />
      {meals.map((meal) => (
        <MealCard key={meal.id} meal={meal} onAddMeal={handleAddMeal} />
      ))}
    </Layout>
  );
};

export async function getStaticProps() {
  const meals = await getMeals();
  return { props: { meals } };
}

export default MealCalendar;
