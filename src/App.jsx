import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LoginPage from './components/LoginPage';
import RegisterPage from './components/RegisterPage';
import HomePage from './components/HomePage';
import ObjetivoPage from './components/ObjetivoPage';
import NovoObjetivoPage from './components/NovoObjetivoPage'; 
import CategoriaPage from './components/CategoriaPage';
import NovaCategoriaPage from './components/NovaCategoriaPage';



function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/objetivos" element={<ObjetivoPage />} />
         <Route path="/objetivos/novo" element={<NovoObjetivoPage />} /> 
        <Route path="/categorias" element={<CategoriaPage />} />
          <Route path="/categorias/nova" element={<NovaCategoriaPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
