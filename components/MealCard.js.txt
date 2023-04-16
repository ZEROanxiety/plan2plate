import React from 'react';

const MealCard = ({ meal, onAddMeal }) => {
  const handleClick = () => {
    onAddMeal({...meal, servings: 1}); // Added servings property with default value of 1
  };

  return (
    <div className="card">
      <div className="card-body">
        <h5 className="card-title">{meal.name}</h5>
        {meal.cost && (
          <p className="card-text">
            Cost: {meal.cost}
          </p>
        )}
        {meal.rating && (
          <p className="card-text">
            Health Rating: {meal.rating}
          </p>
        )}
        {meal.ingredients && (
          <ul className="list-group">
            {meal.ingredients.map((ingredient, index) => (
              <li key={index} className="list-group-item">
                {ingredient}
              </li>
            ))}
          </ul>
        )}
        <button onClick={handleClick} className="btn btn-primary">
          Add Meal
        </button>
      </div>
    </div>
  );
};

export default MealCard;
