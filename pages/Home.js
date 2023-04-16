import Head from 'next/head';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Layout from '../components/Layout';

export default function Home({ meals }) {
  const [loading, setLoading] = useState(true);
  const [database, setDatabase] = useState(null);
  const [error, setError] = useState(null);
  const router = useRouter();

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch('/api/database');
        const data = await response.json();
        setDatabase(data);
        setLoading(false);
      } catch (error) {
        setError('Error fetching database.');
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  function handleStart() {
    router.push('/meal-planner');
  }

  return (
    <Layout>
      <Head>
        <title>My Meals App</title>
      </Head>

      <div className="py-6 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">My Meals App</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {meals.map((meal) => (
            <div key={meal.id} className="bg-white shadow rounded-lg overflow-hidden">
              <img src={meal.image} alt={meal.name} className="w-full h-48 object-cover" />
              <div className="p-4">
                <h2 className="text-lg font-bold mb-2">{meal.name}</h2>
                <p className="text-gray-700">{`Cost: $${meal.cost}, Health Rating: ${meal.health}`}</p>
              </div>
            </div>

export default Home;