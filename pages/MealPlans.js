import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import _ from 'lodash';
import MealPlanCard from '../components/MealPlanCard';
import LoadingSpinner from '../components/LoadingSpinner';

function MealPlans() {
  const [loading, setLoading] = useState(true);
  const [mealPlans, setMealPlans] = useState([]);
  const router = useRouter();

  useEffect(() => {
    // Fetch meal plans data from API endpoint
    fetch('/api/meal-plans')
      .then((response) => response.json())
      .then((data) => {
        setMealPlans(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Failed to load meal plans', error);
        alert('Failed to load meal plans. Please try again later.');
      });
  }, []);

  const handlePlanSelection = (mealPlanId) => {
    router.push(`/meal-plans/${mealPlanId}`);
  };

  return (
    <div>
      <h1>Meal Plans</h1>
      {loading ? (
        <LoadingSpinner />
      ) : (
        <div>
          {mealPlans.length === 0 ? (
            <p>No meal plans found.</p>
          ) : (
            <div>
              <p>Select a meal plan to view:</p>
              <ul>
                {mealPlans.map((mealPlan) => (
                  <li key={mealPlan.id}>
                    <MealPlanCard mealPlan={mealPlan} onClick={() => handlePlanSelection(mealPlan.id)} />
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default MealPlans;