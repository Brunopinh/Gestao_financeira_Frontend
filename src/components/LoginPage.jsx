import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import logoImage from '../assets/imagens/gestao_.png';
import '../styles/LoginPage.css'; // Certifique-se de que o caminho está correto
import { login } from '../services/api'; // Importa a função de login do serviço API
import { useNavigate } from 'react-router-dom';


export default function LoginPage() {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    rememberMe: false
  });

  const navigate = useNavigate(); // Para redirecionar após login

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { username, password } = formData;

    console.log('Tentando fazer login com:', { login: username, senha: password });

    if (!username || !password) {
      alert('Por favor, preencha todos os campos');
      return;
    }

    try {
      const userData = await login(username, password); // usa username e password como args
      console.log('Login realizado:', userData);

      localStorage.setItem('token', userData.token);
      navigate('/home');
    } catch (error) {
      alert('Usuário ou senha inválidos');
    }
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

          <button type="submit"
            onClick={handleSubmit}
          >Entrar</button>

          <div className="signup-text">
            <p>Não tem uma conta? <Link to="/register">Cadastre-se</Link></p>
          </div>
        </form>
      </div>
    </div>
  );
}