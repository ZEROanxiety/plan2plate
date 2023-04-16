import Layout from '../components/Layout';
import MealCalendar from '../components/MealCalendar';
import MealPlanOptions from '../components/MealPlanOptions';
import { meals } from '../../data/meals';

export default function Plan() {
  const [mealPlanOptions, setMealPlanOptions] = useState({});

  const handleMealPlanOptionsChange = (newMealPlanOptions) => {
    setMealPlanOptions((prevState) => ({ ...prevState, ...newMealPlanOptions }));
  };

  const allMeals = meals.flatMap((meal) =>
    meal.options.map((option) => ({ ...option, meal: meal.name }))
  );

  const getRandomMeal = () => {
    const randomIndex = Math.floor(Math.random() * allMeals.length);
    return allMeals[randomIndex];
  };

  const generateMealPlan = (numMeals) => {
    if (!numMeals) {
      console.error('Invalid request body: numMeals is required');
      return { error: 'Invalid request body: numMeals is required' };
    }

    if (numMeals > allMeals.length) {
      console.error('Not enough unique meals available to meet request.');
      return { error: 'Not enough unique meals available to meet request.' };
    }

    const selectedMeals = [];

    for (let i = 0; i < numMeals; i++) {
      let meal;
      do {
        meal = getRandomMeal();
      } while (
        selectedMeals.some(
          (selectedMeal) =>
            selectedMeal.meal === meal.meal &&
            Math.abs(selectedMeal.time - meal.time) <= 2
        )
      );
      selectedMeals.push(meal);
    }

    return { plan: selectedMeals };
  };

  return (
    <Layout title="Meal Plan">
      <div className="container mx-auto px-4">
        <h1 className="text-2xl font-bold mb-4">Plan Your Meals</h1>
        <MealPlanOptions
          onChange={handleMealPlanOptionsChange}
          defaultOptions={mealPlanOptions}
        />
        <MealCalendar
          meals={meals}
          mealPlanOptions={mealPlanOptions}
          generateMealPlan={generateMealPlan}
        />
      </div>
    </Layout>
  );
}

export async function getServerSideProps() {
  return { props: { meals } };
}
