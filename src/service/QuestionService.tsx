import { API_URL} from '../api-routes/routes.tsx'
import type Question from '../types/Question.ts'

export const fetchQuestions = async (category: number, token: string) => {
    try {
        const response = await fetch(`${API_URL}&category=${category}&difficulty=hard&token=${token}`)
        if (!response.ok) {
            throw new Error("error al obtener las preguntas")
        }
        const data = await response.json();

        if (data.response_code === 4) {
            await fetch(`https://opentdb.com/api_token.php?command=reset&token=${token}`);
            throw new Error('Actualizando preguntas, intenta de nuevo...');
            
        }
        return data.results as Question[];
    
    } catch (error) {
        console.error("Error", error);
        throw error;
    }
}


