import React, {useState, useMemo, useEffect} from 'react'
import type Question from '../types/Question.ts'
import { motion, AnimatePresence } from 'framer-motion'
import Nav from './Nav'
import { token_API } from '../api-routes/routes.tsx'
import { fetchQuestions } from '../service/QuestionService.tsx'


const Quizz = () => {
    const [ token, setToken ] = useState('');
    const [category, setCategory] = useState('any')
    const [questions, setQuestions] = useState<Question[]>([])
    const [answerCounter, setAnswerCounter] = useState(0);
    const [currentIndex, setCurrentIndex] = useState(0)
    const [showResults, setShowResults] = useState(false);
    const [error, setError] = useState('')
    const [selection, setSelection] = useState('')
    const [showQuiz, setShowQuiz] = useState(false)

    useEffect(() => {
        const fetchToken = async () => {
        try {
            const res = await fetch(token_API);
            const data = await res.json();
            setToken(data.token);
            console.log("token: ", data.token);
        } catch (err) {
            console.error("Error fetching token:", err);
        }
    };
    const storedUser = localStorage.getItem('guest')

  fetchToken();
}, []);
    
    const getQuestions = async (category: number) => {
        try {
            const questionsData = await fetchQuestions(category, token);
            setQuestions(questionsData);
            
        } catch(error) {
            console.error("error:", error)
        }
    }
    
    const shuffledAnswers = useMemo(() => {
      ;
      if (!questions[currentIndex]) return [];
      return [
        ...questions[currentIndex].incorrect_answers,
        questions[currentIndex].correct_answer,
      ].sort(() => Math.random() - 0.5);
    }, [questions, currentIndex]);
    
   const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('')
    if (category === 'any') {
        setError('Por favor, elige una categoría')
        return;
    }
   await getQuestions(Number(category))
   setShowQuiz(true);
   setCurrentIndex(0);
   setAnswerCounter(0);
   setSelection('')
   
   }

const handleNext = () => {
  if (currentIndex < questions.length - 1) {
    setCurrentIndex((prev) => prev + 1);
    setSelection('');
  } else {
    setShowQuiz(false);
    setShowResults(true);
  }
};

  return (
<>
<Nav/>
    <main className='space-y-5 p-4 gap-2 h-screen flex flex-col items-center justify-center min-w-2xs'>

  { !showQuiz ? (
        <>
      <div>
        <img className='max-w-2xs mx-auto' src="./quizzed.svg" alt="" />
      <h1
      className='text-3xl font-bold my-2 text-center'>Quizz <span className="relative inline-block decorated">Time</span></h1>
      <p className='text-gray-400'>Pon a prueba tus conocimientos con series de hasta 10 preguntas</p>
      </div>
      <div>
        <p>Solo elige la temática y comenzamos!</p>
      </div>
      <form 
      onSubmit={handleSubmit}
      className='my-1 space-y-4 flex flex-col items-center' action="">
        <select
        onChange={(e) => setCategory(e.target.value)}
        className='p-2 border rounded-md border-slate-50' name="" id="">
          <option value="any">Cualquier categoría</option>
          <option value="9">Conocimiento general</option>
          <option value="10">Libros</option>
          <option value="11">Cine</option>
          <option value="12">Música</option>
          <option value="14">Televisión</option>
          <option value="15">Videojuegos</option>
          <option value="16">Juegos de mesa</option>
          <option value="17">Ciencia y Naturaleza</option>
          <option value="18">Computadoras</option>
          <option value="19">Matemáticas</option>
          <option value="20">Mitología</option>
          <option value="21">Deportes</option>
          <option value="22">Geografía</option>
          <option value="23">Historia</option>
          <option value="24">Política</option>
          <option value="25">Arte</option>
          <option value="26">Celebridades</option>
          <option value="27">Animales</option>
          <option value="28">Vehículos</option>
        </select>
        <button 
        disabled={selection !== ''}
        type='submit' className='border flex gap-2 hover:bg-blue-400 font-medium items-center border-blue-400 cursor-pointer p-3 rounded-md'>Comenzar 
          <svg xmlns="http://www.w3.org/2000/svg" width={20} height={20} viewBox="0 0 24 24">
	        <path fill="currentColor" d="M20 11H7.83l5.59-5.59L12 4l-8 8l8 8l1.41-1.41L7.83 13H20z"></path>
          </svg>
        </button>
      </form>
      {error && <p className="text-red-500">{error}</p>}
      </>) : (

      <div className='relative w-full min-h-screen flex items-center justify-center overflow-hidden'>
            <AnimatePresence mode="wait">
              {questions[currentIndex] && (
                  <motion.div
                  key={currentIndex}
                  initial={{ x: 300, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  exit={{ x: -300, opacity: 0 }}
                  transition={{ duration: 0.5 }}
                  className='absolute shadow-md border py-6 rounded-xl p-2 max-w-lg w-full text-center space-y-4'
                  >
                <h2 className='text-base w-full p-2 font-semibold' dangerouslySetInnerHTML={{ __html: questions[currentIndex].question }} />
              <div className='grid grid-cols-1 p-2 gap-2'>
      {shuffledAnswers.map((option, index) => (
          <button
          key={index}
          
          onClick={() => {
              setSelection(option);
              const isCorrect = option === questions[currentIndex].correct_answer;
              if (isCorrect) {
                  setAnswerCounter((prev) => prev + 1);
                }
            }}
            
            className={`p-2 border rounded-md transition 
                ${selection === option ? 'bg-green-600 text-white' : 'hover:bg-blue-400 hover:text-slate-900'}`}
                dangerouslySetInnerHTML={{ __html: option }}
                />
            ))
        }
      </div>
                <button
                  onClick={handleNext}
                  className='mt-4 bg-blue-500 text-white px-8 py-3 rounded-full hover:bg-blue-600'
                  >
                  Siguiente
                </button>
              </motion.div>
  )}
            </AnimatePresence>
          </div>
)}  
 {showResults && (
  <div className="text-center space-y-4">
    <h2 className="text-2xl font-bold">¡Terminaste el quiz!</h2>
    <p className="text-xl">
      Respondiste correctamente {answerCounter} de {questions.length} preguntas.
    </p>
    <button
      onClick={() => {
        setSelection('');
        setShowResults(false);
        setCurrentIndex(0);
        setAnswerCounter(0);
        setQuestions([]);
      }}
      className="mt-4 bg-blue-500 text-white px-6 py-3 rounded-md hover:bg-blue-600"
    >
      Volver al inicio
    </button>
  </div>
)}
</main>
  </>
  )
}

export default Quizz