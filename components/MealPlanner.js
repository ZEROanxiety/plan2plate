import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import _ from 'lodash';
import shuffle from 'lodash/shuffle';
import MealCard from './MealCard';
import MealPlan from './MealPlan';
import LoadingSpinner from './LoadingSpinner';

function MealPlanner() {
  const [loading, setLoading] = useState(true);
  const [database, setDatabase] = useState([]);
  const [selectedMeals, setSelectedMeals] = useState([]);
  const [mealsPerDay, setMealsPerDay] = useState(3);
  const [outputType, setOutputType] = useState('random');
  const [numDays, setNumDays] = useState(7); // assuming planning for 1 week
  const router = useRouter();

useEffect(() => {
    const controller = new AbortController();
    const fetchData = async () => {
      try {
        const [mealsResponse, otherDataResponse] = await Promise.all([
          fetch('/api/meals', { signal: controller.signal }),
          fetch('/api/other-data', { signal: controller.signal })
        ]);

        if (!mealsResponse.ok || !otherDataResponse.ok) {
          throw new Error('Failed to fetch data');
        }

        const [mealsData, otherData] = await Promise.all([
          mealsResponse.json(),
          otherDataResponse.json()
        ]);

        setDatabase(mealsData);
        setLoading(false);
      } catch (error) {
        console.error('Failed to load data', error);
        alert('Failed to load data. Please try again later.');
      }
    };
    fetchData();
    return () => {
      controller.abort();
    };
  }, []);

  const toggleMealSelection = useCallback((meal) => {
  setSelectedMeals((prevSelectedMeals) =>
    prevSelectedMeals.includes(meal)
      ? prevSelectedMeals.filter((selectedMeal) => selectedMeal !== meal)
      : [...prevSelectedMeals, meal]
  );
}, [setSelectedMeals]);

  const validateSelection = () => {
  if (selectedMeals.length === 0 || selectedMeals.length > mealsPerDay * numDays) {
    alert(`Please select between 1 and ${mealsPerDay * numDays} meals to plan.`);
    return false;
  }

  const maxMeals = mealsPerDay * numDays;
  if (selectedMeals.length > maxMeals) {
    alert(`You have selected more meals than available for ${numDays} days.`);
    return false;
  }

  return true;
};

  const selectedMealsData = useMemo(() => {
  return selectedMeals.filter((meal) => {
    return database.find((m) => m.id === meal.id);
  });
}, [selectedMeals, database]);

function generateMealPlans(selectedMealsData) {
  const shuffledMeals = shuffle(selectedMealsData);
  const mealPlan = new MealPlan();
  return mealPlan.plan(shuffledMeals, mealsPerDay, outputType);
}

  const handlePlan = () => {
  try {
    const isValidSelection = validateSelection();
    if (!isValidSelection) return;
    
    const mealPlans = generateMealPlans(selectedMealsData);
    console.log(mealPlans); // for debugging purposes
    router.push('/meal-plans', { mealPlans }); // render meal plans on new page
  } catch (error) {
    console.error('Failed to plan meals', error);
    alert(error.message);
  }
};

  const handleCancel = () => {
    router.back();
  };

function renderMeals() {
  return selectedMealsData.map((meal) => (
    <div className="col-sm-4 mb-3" key={meal.id}>
      <MealCard meal={meal} />
    </div>
  ));
}

  return (
    <div>
      <h1>Meal Planner</h1>
      {loading ? (
        <LoadingSpinner />
      ) : (
        <div>
          <p>Selected Meals: {selectedMeals.length}</p>
          <ul>
            {database.map((meal) => (
              <li key={meal.id}>
                <button
                  disabled={selectedMeals.some((selectedMeal) => selectedMeal.id === meal.id)}
                  onClick={() => toggleMealSelection(meal)} // corrected function name
                >
                  {meal.name}
                </button>
              </li>
            ))}
          </ul>
          <label htmlFor="meals-per-day">Meals per day:</label>
          <input
            id="meals-per-day"
            type="number"
            value={mealsPerDay}
            onChange={(event) => setMealsPerDay(parseInt(event.target.value))}
          />
          <label htmlFor="output-type">Output type:</label>
          <select
            id="output-type"
            value={outputType}
            onChange={(event) => setOutputType(event.target.value)}
          >
            <option value="random">Random</option>
            <option value="cost">Cost</option>
            <option value="nutritional-balance">Nutritional Balance</option>
          </select>
          <button onClick={handlePlan}>Plan Meals</button>
          <button onClick={handleCancel}>Cancel</button>
        </div>
      )}
    </div>
  );

}


export default MealPlanner;

