import { Route, Routes} from 'react-router-dom'
import Login from './user-login/Login'
import Quizz from './components/Quizz'
import SignOnQuizz from './user-login/SignOnQuizz'
import UserPage from './user-login/UserPage'

const Router = () => {
  return (
    <Routes>
        <Route path='/' element={<Login/>} />
        <Route path='/account' element={<SignOnQuizz/>} />
        <Route path='/quizz' element={
                <Quizz/>
            } />
        <Route path='/scores/:id' element={<UserPage/>} />
    </Routes>
  )
}

export default Router