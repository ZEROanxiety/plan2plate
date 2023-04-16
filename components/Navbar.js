import Link from 'next/link'

export default function Navbar() {
  return (
    <nav>
      <ul>
        <li>
          <Link href="/">
            <a>Home</a>
          </Link>
        </li>
        <li>
          <Link href="/meals">
            <a>My Meals</a>
          </Link>
        </li>
        <li>
          <Link href="/restaurants">
            <a>My Restaurants</a>
          </Link>
        </li>
        <li>
          <Link href="/plan">
            <a>Meal Plan</a>
          </Link>
        </li>
      </ul>
    </nav>
  )
}
