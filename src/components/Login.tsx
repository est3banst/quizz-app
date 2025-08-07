import { useAuth } from "react-oidc-context";
import { useNavigate } from "react-router-dom";
import Loader from "./Loader";

const Login = () => {
  const auth = useAuth();
  const navigate = useNavigate();

//  const signOutRedirect = () => {
//     const clientId = "1kg2mfah43ndkqoajjcchtv1uj";
//     const logoutUri = "<logout uri>";
//     const cognitoDomain = "https://sa-east-1yhifirvmq.auth.sa-east-1.amazoncognito.com";
//     window.location.href = `${cognitoDomain}/logout?client_id=${clientId}&logout_uri=${encodeURIComponent(logoutUri)}`;
//   };

  const playAsGuest = () => {
    localStorage.setItem("guest", "true");
    navigate("/quizz");
  };

  const signOut = () => {
    localStorage.removeItem("guest");
    auth.removeUser(); 
  };

  if (auth.isLoading) {
    return <Loader/>;
  }

  if (auth.error) {
    return <div>error... {auth.error.message}</div>;
  }

  if (auth.isAuthenticated) {
    navigate("/quizz");
    return null;
  }

  return (
    <div className="flex flex-col relative gap-3 h-screen">
      <h1 className="text-3xl text-center font-black py-6">Quizz <span className="relative inline-block decorated">Time</span></h1>
      <div className="flex flex-col gap-4">
        <button className="cursor-pointer p-2" onClick={() => auth.signinRedirect()}>Iniciar sesión</button>
        <button className="cursor-pointer p-2" onClick={playAsGuest}>Acceder como Invitado</button>
        {/* <button className="cursor-pointer p-2" onClick={signOutRedirect}>Cerrar sesión</button> */}
      </div>
        <span>
          <img src="./answered.svg" alt="" className="max-w-3xl mx-auto" />
        </span>
            <p className="text-center text-sm mt-4">Powered by <a className="underline" target="_blank" href="https://kustomdev.com">K</a></p>

    </div>
  );
};

export default Login;
