import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';

const Layout = ({ children, title }) => {
  const router = useRouter();

  return (
    <div>
      <Head>
        <title>{title ? `${title} - Meal Planner App` : 'Meal Planner App'}</title>
        <meta name="description" content="A meal planning app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
          <Link href="/">
            <a className="navbar-brand mr-auto">Meal Planner</a>
          </Link>
          <div className="collapse navbar-collapse">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className={`nav-item ${router.pathname === '/' ? 'active' : ''}`}>
                <Link href="/">
                  <a className="nav-link">Home</a>
                </Link>
              </li>
              <li className={`nav-item ${router.pathname === '/meal-planner' ? 'active' : ''}`}>
                <Link href="/meal-planner">
                  <a className="nav-link">Meal Planner</a>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <main className="container my-4">{children}</main>

      <footer className="bg-light py-3" role="contentinfo">
        <div className="container">
          <p className="text-center">
            &copy; 2023 Meal Planner App. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
