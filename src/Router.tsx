import { Route, Routes} from 'react-router-dom'
import Login from './components/Login'
import Quizz from './components/Quizz'
import AuthMiddle from './components/AuthMiddle'

const Router = () => {
  return (
    <Routes>
        <Route path='/' element={<Login/>} />
        <Route path='/quizz' element={
            <AuthMiddle>
                <Quizz/>
            </AuthMiddle>
            } />
    </Routes>
  )
}

export default Router