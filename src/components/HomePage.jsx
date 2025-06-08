import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/HomePage.css'; // Certifique-se de que o caminho está correto
import objetivoIcon from '../assets/imagens/objetivo.png';
import logo from '../assets/imagens/gestao_.png';
import perfil from '../assets/imagens/perfil.png';

const HomePage = ({ username = 'Usuário' }) => {
  const navigate = useNavigate();
  
  const handleObjetivosClick = () => {
    try {
      navigate('/objetivos');
    } catch (error) {
      console.error('Erro na navegação:', error);
    }
  };

  return (
    <div>
      <header className="header">
        <div className="header-content">
          <img src={logo} alt="Gestão Financeira" height="50" />
          <div className="user-info">
            <img src={perfil} alt="User" className="user-avatar" />
            <span className="username">{username}</span>
          </div>
        </div>
      </header>

      <div className="container">
        <div className="welcome-section">
          <h2>Bem-vindo(a), {username}!</h2>
          <p>Selecione uma opção abaixo para começar</p>
        </div>

        <div className="menu-grid">
          <div className="menu-item" onClick={handleObjetivosClick}>
            <img src={objetivoIcon} alt="Objetivo" />
            <h3>Objetivos</h3>
            <p>Gerencie seus objetivos financeiros</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
