// plan-meals.js
import _ from 'lodash';

export function planMeals(selectedMeals, mealsPerDay, outputType) {
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
        switch (outputType) {
          case 'random':
            meal = _.sample(selectedMeals);
            break;
          case 'cost':
            meal = _.maxBy(mealsByCost[Math.floor(Math.random() * 4)], 'cost');
            break;
          case 'nutritional-balance':
            const selectedMealRatings = mealPlan.map((m) => m.rating);
            const selectedMealNutrition = mealPlan.map((m) => m.nutrition);
            const eligibleMeals = mealsByRating[Math.max(...selectedMealRatings)].filter((m) => selectedMealNutrition.includes(m.nutrition));
            meal = _.sample(eligibleMeals);
            break;
          default:
            meal = _.sample(selectedMeals);
            break;
        }
      }
      
      mealPlan.push(meal);
    }
    
    mealPlans.push(mealPlan);
  }
  
  return mealPlans;
}
