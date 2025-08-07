import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { AuthProvider as OidcContext } from "react-oidc-context";
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './components/context/AuthContext.tsx';

import './index.css'
import App from './App.tsx'

const cognitoAuthConfig = {
  authority: "https://cognito-idp.sa-east-1.amazonaws.com/sa-east-1_yhiFIRVmQ",
  client_id: "1kg2mfah43ndkqoajjcchtv1uj",
  redirect_uri: "https://quizz-app-plum-theta.vercel.app/",
  response_type: "code",
  scope: "email openid phone",
};

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
    <OidcContext {...cognitoAuthConfig}>
      <AuthProvider>
        <App />
      </AuthProvider>
    </OidcContext>
    </BrowserRouter>
  </StrictMode>,
)
