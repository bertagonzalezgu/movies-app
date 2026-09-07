import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles/index.css'
import App from './routes/App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { AuthProvider } from './features/auth/context/AuthProvider'

createRoot(document.getElementById('root')).render(
  <AuthProvider>
    <BrowserRouter basename="/PROJECT-3---MOVIES/">
      <StrictMode>
        <App/>
      </StrictMode>
  </BrowserRouter>
  </AuthProvider>
)
