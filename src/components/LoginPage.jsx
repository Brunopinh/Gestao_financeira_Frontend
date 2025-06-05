import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import logoImage from '../assets/imagens/gestao_.png';
import './LoginPage.css';

export default function LoginPage() {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    rememberMe: false
  });

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.username || !formData.password) {
      alert('Por favor, preencha todos os campos');
      return;
    }
    console.log('Form submitted:', formData);
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-header">
          <img src={logoImage} alt="Logo" className="login-logo" />
          <h2>Faça login</h2>
          <p>Gestão Financeira</p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="username">Usuário</label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleInputChange}
              placeholder="Digite seu usuário"
            />
          </div>

          <div className="input-group">
            <label htmlFor="password">Senha</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              placeholder="Digite sua senha"
            />
          </div>

          <div className="options-group">
            <div className="remember-me">
              <input
                type="checkbox"
                id="rememberMe"
                name="rememberMe"
                checked={formData.rememberMe}
                onChange={handleInputChange}
              />
              <label htmlFor="rememberMe">Lembrar-me</label>
            </div>
            <a href="#" className="forgot-password">Esqueci minha senha</a>
          </div>

          <button type="submit">Entrar</button>

          <div className="signup-text">
            <p>Não tem uma conta? <Link to="/register">Cadastre-se</Link></p>
          </div>
        </form>
      </div>
    </div>
  );
}