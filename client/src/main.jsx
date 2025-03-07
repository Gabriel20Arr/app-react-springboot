import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from "react-router-dom"
import { AuthProvider } from "./context/AuthContext"
import { ProductProvider } from "./context/ProductContext"
import { SearchProvider } from './context/SearchContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <SearchProvider>
        <ProductProvider>
          <BrowserRouter>
            <App /> 
          </BrowserRouter>
        </ProductProvider>
      </SearchProvider>
    </AuthProvider>
  </StrictMode>
)
