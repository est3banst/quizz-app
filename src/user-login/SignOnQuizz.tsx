import { useState } from "react";
import { Amplify } from "aws-amplify";
import { signUp, confirmSignUp, signIn, getCurrentUser } from "aws-amplify/auth";
import awsExports from "../aws-exports";
import { useUser } from "../context/UserContext";
import { Link, useNavigate } from "react-router-dom";

Amplify.configure(awsExports);

const SignOnQuizz = () => {
  const [signOn, setSignOn] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [confirmationCode, setConfirmationCode] = useState("");
  const [step, setStep] = useState<"form" | "confirm">("form");
  const [loading, setLoading] = useState(false);
  const { setUser } = useUser();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (signOn) {
        const signedInResult = await signIn({username: email, password});
        if (signedInResult.isSignedIn) {
            const currentUser = await getCurrentUser();
            setUser({ id: currentUser.userId, email: currentUser.signInDetails?.loginId || "" });
        }
        navigate("/quizz");
        alert("Login successful!");
      } else {
        if (password !== confirmPassword) {
          alert("Las contraseñas no coinciden");
          return;
        }
        await signUp({
          username: email,
          password,
          options: {
            userAttributes: { email },
          },
        });
        alert("Código de confirmación enviado a tu correo");
        setStep("confirm");
      }
    } catch (error: any) {
      console.error("Error:", error);
      alert(error.message || "Algo salió mal");
    } finally {
      setLoading(false);
    }
  };

  const handleConfirm = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await confirmSignUp({ username: email, confirmationCode });
      alert("Cuenta confirmada, ahora puedes iniciar sesión");
      setSignOn(true);
      setStep("form");
    } catch (error: any) {
      console.error("Error confirmando:", error);
      alert(error.message || "Error confirmando cuenta");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1 className="text-3xl text-center font-black py-6">
        <Link to="/">
          Quizz <span className="relative inline-block decorated">Time</span>
        </Link>
      </h1>

      {step === "form" && (
        <form
          className="flex items-center justify-center flex-col p-4 gap-3"
          onSubmit={handleSubmit}
        >
          <label className="min-w-80" htmlFor="email">
            Email:
          </label>
          <input
            id="email"
            type="email"
            className="border min-w-80 border-gray-400 px-2 py-1"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <label className="min-w-80" htmlFor="password">
            Contraseña:
          </label>
          <input
            id="password"
            className="border min-w-80 border-gray-400 px-2 py-1"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          {!signOn && (
            <>
              <label className="min-w-80" htmlFor="confirmPassword">
                Confirmar Contraseña:
              </label>
              <input
                id="confirmPassword"
                className="border min-w-80 border-gray-400 px-2 py-1"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </>
          )}

          <button
            type="submit"
            className="mt-4 bg-blue-500 min-w-80 cursor-pointer text-white px-8 py-3 rounded-full hover:bg-blue-600"
            disabled={loading}
          >
            {loading
              ? "Cargando..."
              : signOn
              ? "Iniciar sesión"
              : "Registrarse"}
          </button>

          <button
            type="button"
            className="mt-4 cursor-pointer text-blue-500 underline"
            onClick={() => setSignOn(!signOn)}
          >
            {signOn
              ? "¿No tienes cuenta? Regístrate aquí"
              : "¿Ya tienes cuenta? Inicia sesión"}
          </button>
        </form>
      )}

      {step === "confirm" && (
        <form
          className="flex items-center justify-center flex-col p-4 gap-3"
          onSubmit={handleConfirm}
        >
          <label className="min-w-80" htmlFor="confirmationCode">
            Código de confirmación:
          </label>
          <input
            id="confirmationCode"
            type="text"
            className="border min-w-80 border-gray-400 px-2 py-1"
            value={confirmationCode}
            onChange={(e) => setConfirmationCode(e.target.value)}
          />

          <button
            type="submit"
            className="mt-4 bg-green-500 cursor-pointer text-white px-8 py-3 rounded-full hover:bg-green-600"
            disabled={loading}
          >
            {loading ? "Confirmando..." : "Confirmar cuenta"}
          </button>
        </form>
      )}
    </div>
  );
};

export default SignOnQuizz;
