import Head from 'next/head'
import Link from 'next/link'
import styles from '../styles/Home.module.css'

export default function Restaurants() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Meal Planning App - Restaurants</title>
        <meta name="description" content="Restaurant page for Meal Planning App" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Restaurants
        </h1>

        <p className={styles.description}>
          Specify your favorite dishes from each restaurant:
        </p>

        <div className={styles.grid}>
          <a href="#" className={styles.card}>
            <h2>Restaurant 1 &rarr;</h2>
            <p>Favorite Dish 1</p>
            <p>Favorite Dish 2</p>
          </a>

          <a href="#" className={styles.card}>
            <h2>Restaurant 2 &rarr;</h2>
            <p>Favorite Dish 1</p>
            <p>Favorite Dish 2</p>
          </a>

          <a href="#" className={styles.card}>
            <h2>Restaurant 3 &rarr;</h2>
            <p>Favorite Dish 1</p>
            <p>Favorite Dish 2</p>
          </a>

          <a href="#" className={styles.card}>
            <h2>Restaurant 4 &rarr;</h2>
            <p>Favorite Dish 1</p>
            <p>Favorite Dish 2</p>
          </a>
        </div>

        <div className={styles.grid}>
          <Link href="/">
            <a className={styles.card}>
              <h2>&larr; Back to Home</h2>
            </a>
          </Link>

          <Link href="/meals">
            <a className={styles.card}>
              <h2>Next: Meals &rarr;</h2>
            </a>
          </Link>
        </div>
      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <img src="/vercel.svg" alt="Vercel Logo" className={styles.logo} />
        </a>
      </footer>
    </div>
  )
}
