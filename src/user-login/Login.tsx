import { useNavigate } from "react-router-dom";
import Loader from "../components/Loader";

const Login = () => {

  const navigate = useNavigate();

  const signIn = () => {
    navigate('/account')
  }
  const signInAsGuest = () => {
    localStorage.setItem("guest", "true");
    navigate('/quizz')
  }

  return (
    <div className="flex flex-col relative gap-3 h-screen">
      <h1 className="text-3xl text-center font-black py-6">Quizz <span className="relative inline-block decorated">Time</span></h1>
      <div className="flex flex-col gap-4">
        <button className="cursor-pointer p-2" onClick={signIn}>Iniciar sesión</button>
        <button className="cursor-pointer p-2" onClick={signInAsGuest}>Acceder como Invitado</button>
      </div>
        <span>
          <img src="./answered.svg" alt="" className="max-w-3xl mx-auto" />
        </span>
            <p className="text-center text-sm mt-4">Powered by <a className="underline" target="_blank" href="https://kustomdev.com">K</a></p>

    </div>
  );
};

export default Login;
