import { Link, useNavigate } from 'react-router-dom';
import { useUser } from '../context/UserContext';
import { signOut } from 'aws-amplify/auth';

const Nav = () => {
  const { user, setUser } = useUser();
  const navigate = useNavigate();

  const userEmail = user?.email || 'Invitado';

  const handleSignOut = async () => {
    try {
      await signOut();
      localStorage.clear();
      setUser(null);
      navigate('/acount'); 
    } catch (error) {
      console.error("Error: ", error);
    }
  };

  return (
    <nav className='flex flex-col md:flex-row gap-4 justify-between items-center'>
      <h2 className='text-2xl py-6'>Hola {userEmail}!</h2>

      <ul className='flex text-sm gap-4'>
        <li className='flex hover:bg-gray-700 cursor-pointer px-4 py-2 bg-gray-600 rounded-full gap-2 items-center'><Link to="/scores">Mis puntajes</Link> <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 50 50">
	<g fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}>
		<path stroke="#626262" d="M6.25 25c8.333 0 27.083-4.167 35.417-18.75"></path>
		<path stroke="#626262" d="M33.333 6.25h8.334l2.083 8.333"></path>
		<path stroke="#e1e1e1" d="M12.5 43.75H6.25v-8.333h6.25zm16.667-12.5h-6.25v12.5h6.25zm16.666-8.333h-6.25V43.75h6.25z"></path>
	</g>
</svg></li>
        <li className='bg-gray-600 hover:bg-gray-700 cursor-pointer rounded-full px-4 py-2 flex gap-2 items-center'><Link to="/help">Ayuda</Link> <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24">
	<path fill="currentColor" d="M12.028 17.23q.332 0 .56-.228t.228-.56t-.23-.56q-.228-.228-.56-.228t-.56.229t-.227.56q0 .332.228.56q.23.228.561.228m-.517-3.312h.966q.038-.652.245-1.06q.207-.407.851-1.04q.67-.669.996-1.199t.327-1.226q0-1.182-.83-1.884q-.831-.702-1.966-.702q-1.079 0-1.832.586q-.753.587-1.103 1.348l.92.381q.24-.546.687-.965q.447-.42 1.29-.42q.972 0 1.42.534q.449.534.449 1.174q0 .52-.281.928q-.28.409-.73.822q-.87.802-1.14 1.36t-.269 1.363M12.003 21q-1.866 0-3.51-.708q-1.643-.709-2.859-1.924t-1.925-2.856T3 12.003t.709-3.51Q4.417 6.85 5.63 5.634t2.857-1.925T11.997 3t3.51.709q1.643.708 2.859 1.922t1.925 2.857t.709 3.509t-.708 3.51t-1.924 2.859t-2.856 1.925t-3.509.709M12 20q3.35 0 5.675-2.325T20 12t-2.325-5.675T12 4T6.325 6.325T4 12t2.325 5.675T12 20m0-8"></path>
</svg></li>
      </ul>

      {user ? (
        <button className='cursor-pointer hover:bg-red-600 rounded-full bg-red-500 px-6 py-2' onClick={handleSignOut}>Cerrar sesión</button>
      ) : (
        <Link to="/account">Iniciar sesión</Link>
      )}
    </nav>
  );
};

export default Nav;
