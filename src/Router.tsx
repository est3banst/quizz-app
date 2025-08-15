import { Route, Routes} from 'react-router-dom'
import Login from './user-login/Login'
import Quizz from './components/Quizz'
import SignOnQuizz from './user-login/SignOnQuizz'

const Router = () => {
  return (
    <Routes>
        <Route path='/' element={<Login/>} />
        <Route path='/account' element={<SignOnQuizz/>} />
        <Route path='/quizz' element={
                <Quizz/>
            } />
    </Routes>
  )
}

export default Router