import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom';
import { UserProvider } from './context/UserContext.tsx';
import './index.css'
import App from './App.tsx'
import AuthMiddleware from './user-login/AuthMiddleware.tsx';



createRoot(document.getElementById('root')!).render(
  <StrictMode>
  
          <BrowserRouter>
      <UserProvider>
        <AuthMiddleware>

        <App />
        </AuthMiddleware>
      </UserProvider>
          </BrowserRouter>
  
  </StrictMode>,
)
