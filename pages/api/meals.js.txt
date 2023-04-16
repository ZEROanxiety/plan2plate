import Head from 'next/head';
import Link from 'next/link';
import Layout from '../../components/Layout';
import { useState } from 'react'
import { connectToDatabase } from '../../lib/db';

export default function Meals() {
  const [favoriteMeals, setFavoriteMeals] = useState([])

  const handleSubmit = (event) => {
    event.preventDefault()
    const form = event.target
    const mealName = form.mealName.value
    const mealCost = form.mealCost.value
    const mealHealthRating = form.mealHealthRating.value
    setFavoriteMeals([...favoriteMeals, { name: mealName, cost: mealCost, healthRating: mealHealthRating }])
    form.reset()
  }

  return (
    <div>
      <Head>
        <title>Meal Planning and Budgeting App - Meals</title>
        <meta name="description" content="An app to help plan meals and budgets." />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1 className="title">
          Meals
        </h1>

        <p className="description">
          Please input your favorite home cooked meals, their cost, and health rating.
        </p>

        <form onSubmit={handleSubmit}>
          <label htmlFor="mealName">Meal Name:</label>
          <input type="text" name="mealName" required />
          <br />
          <label htmlFor="mealCost">Meal Cost:</label>
          <input type="number" name="mealCost" required min="0" step=".01" />
          <br />
          <label htmlFor="mealHealthRating">Meal Health Rating (1-10):</label>
          <input type="number" name="mealHealthRating" required min="1" max="10" />
          <br />
          <button type="submit">Submit</button>
        </form>

        {favoriteMeals.length > 0 &&
          <div>
            <h2>Favorite Meals:</h2>
            <ul>
              {favoriteMeals.map((meal, index) => (
                <li key={index}>
                  {meal.name} - Cost: {meal.cost}, Health Rating: {meal.healthRating}
                </li>
              ))}
            </ul>
          </div>
        }
      </main>

      <footer>
        <a
          href="/"
          rel="noopener noreferrer"
        >
          &larr; Go Back Home
        </a>
      </footer>

      <style jsx>{`
        main {
          padding: 5rem 0;
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }

        form {
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          gap: 0.5rem;
          margin-bottom: 2rem;
        }

        input, button {
          font-size: 1.2rem;
          padding: 0.5rem;
          border: none;
          border-radius: 0.25rem;
          box-shadow: 0px 0px 10px rgba(0,0,0,0.1);
        }

        input[type="number"] {
          width: 5rem;
        }

        button {
          cursor: pointer;
          background-color: #4CAF50;
          color: white;
          transition: all 0.2s ease;
        }

        button:hover {
          transform: scale(1.05);
          background-color: #3e8e41;
        }

        ul {
          margin: 0;
          padding: 0

export async function getServerSideProps() {
  // Fetch meals data from API or database
  const { db } = await connectToDatabase();
  const meals = await db.collection('meals').find().toArray();

  return { props: { meals } };
}

export async function handler(req, res) {
  const { method } = req;

  const { db } = await connectToDatabase();

  switch (method) {
    case 'GET':
      const meals = await db.collection('meals').find().toArray();
      res.status(200).json({ meals });
      break;
    case 'POST':
      const meal = req.body;
      await db.collection('meals').insertOne(meal);
      res.status(201).json({ message: 'Meal created successfully!' });
      break;
    default:
      res.setHeader('Allow', ['GET', 'POST']);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}

