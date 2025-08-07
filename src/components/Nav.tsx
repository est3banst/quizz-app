import { Link } from 'react-router-dom';
import {useAuth } from 'react-oidc-context';

const Nav = () => {
    const auth = useAuth();
    
   
  return (
    <nav>
        <h2>Hello {auth.isAuthenticated ? auth.user?.profile.email : 'Guest'}</h2>

        <ul>
            <li><Link to="/">

            </Link>
            </li>
            <li>
                <Link to="/quizz">
                </Link>
            </li>
            <li>
                <Link to="/scores">
                </Link>
            </li>
            <li>
                <Link to="/about">
                </Link>
            </li>
        </ul>
    </nav>
  )
}

export default Nav