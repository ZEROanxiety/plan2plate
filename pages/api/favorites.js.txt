import { connectToDatabase } from '../../lib/db'
import Head from 'next/head';
import { useState, useEffect } from 'react';

export default function Favorites() {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    // Fetch favorites from the API
    fetch('/api/favorites')
      .then(response => response.json())
      .then(data => setFavorites(data.favorites));
  }, []);

  return (
    <div>
      <Head>
        <title>Meal Planner - Favorites</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1>Favorite Meals</h1>
        {favorites.length > 0 ? (
          <ul>
            {favorites.map(favorite => (
              <li key={favorite.id}>
                <h2>{favorite.name}</h2>
                <p>Cost: ${favorite.cost.toFixed(2)}</p>
                <p>Healthiness: {favorite.healthiness}/10</p>
                {favorite.photo && (
                  <img src={favorite.photo} alt={favorite.name} />
                )}
              </li>
            ))}
          </ul>
        ) : (
          <p>No favorites yet.</p>
        )}
      </main>

      <footer>
        <p>Powered by Meal Planner</p>
      </footer>
    </div>
  );
}

export async function handler(req, res) {
  const { method } = req

  try {
    const db = await connectToDatabase()

    switch (method) {
      case 'GET':
        const favorites = await db.collection('favorites').find().toArray()
        res.status(200).json({ favorites })
        break
      case 'POST':
        const favorite = req.body
        await db.collection('favorites').insertOne(favorite)
        res.status(201).json({ message: 'Favorite created successfully!' })
        break
      default:
        res.setHeader('Allow', ['GET', 'POST'])
        res.status(405).end(`Method ${method} Not Allowed`)
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error' })
  }
}

export { handler };
