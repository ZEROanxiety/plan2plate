import React from 'react';
import MealCard from './MealCard';
import _ from 'lodash';

function MealPlan({ mealPlan = [], onAddMeal }) {

  const handleAddMeal = (meal) => {
    // Check if the meal is already in the meal plan
    const isMealInPlan = mealPlan.some((dayMeals) =>
      dayMeals.some((m) => m.id === meal.id)
    );

    if (!isMealInPlan) {
      onAddMeal(meal);
    }
  };

  function planMeals(selectedMeals, mealsPerDay, outputType) {
    const mealPlans = [];
    const numDays = Math.ceil(selectedMeals.length / mealsPerDay);
    const mealsByRating = _.groupBy(selectedMeals, 'rating');
    const mealsByCost = _.groupBy(selectedMeals, 'cost');
    const mealsByNutrition = _.groupBy(selectedMeals, 'nutrition');

    for (let i = 0; i < numDays; i++) {
      const mealPlan = [];

      for (let j = 0; j < mealsPerDay; j++) {
        let meal = null;

        if (mealPlan.length === 0) {
          // Select first meal randomly
          meal = _.sample(selectedMeals);
        } else {
          // Select subsequent meals based on output type
        }
        mealPlan.push(meal);
      }

      mealPlans.push(mealPlan);
    }

    return mealPlans;
  }

  return (
    <div className="meal-plan">
      {mealPlan.map((meals, dayIndex) => (
        <div className="day-meals" key={dayIndex}>
          <h3>Day {dayIndex + 1}</h3>
          <div className="meals">
            {meals.map((meal, mealIndex) => (
              <MealCard meal={meal} key={mealIndex} onClick={() => handleAddMeal(meal)} />
            ))}
            <button onClick={() => handleAddMeal()} className="btn btn-primary">
              Add Meal
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default MealPlan;
