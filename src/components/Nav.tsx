import { Link, useNavigate } from 'react-router-dom';
import { useUser } from '../context/UserContext';
import { signOut } from 'aws-amplify/auth';

const Nav = () => {
  const { user, setUser } = useUser();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    try {
      await signOut();
      localStorage.removeItem('user');
      setUser(null);
      navigate('/acount'); 
    } catch (error) {
      console.error("Error: ", error);
    }
  };

  return (
    <nav>
      <h2>Hello {user?.email ?? 'Guest'}</h2>

      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/quizz">Quizz</Link></li>
        <li><Link to="/scores">Scores</Link></li>
        <li><Link to="/about">About</Link></li>
      </ul>

      {user ? (
        <button onClick={handleSignOut}>Cerrar sesión</button>
      ) : (
        <Link to="/login">Iniciar sesión</Link>
      )}
    </nav>
  );
};

export default Nav;
