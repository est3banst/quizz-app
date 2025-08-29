import { useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useUser } from '../context/UserContext';


const UserPage = () => {
    const navigate = useNavigate();
    const {id: routeUserId} = useParams();
    const { user, setUser } = useUser();

    useEffect(() => {
        const currUsId = localStorage.getItem('userId');
        if (!currUsId || routeUserId !== currUsId && user?.id !== currUsId) {
            navigate('/account', {replace: true});
        }

    })

  return (
    <div>Hola {user?.email}
    <p>Tu ID: {user?.id}</p>
    <Link to="/quizz">Volver a Quizz Time</Link>
    </div>
  )
}

export default UserPage