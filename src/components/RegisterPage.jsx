import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import logoImage from '../assets/imagens/gestao_.png';
import './RegisterPage.css';

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.password) {
      alert('Por favor, preencha todos os campos');
      return;
    }
    console.log('Form submitted:', formData);
  };

  return (
    <div className="register-container">
      <div className="register-card">
        <div className="register-header">
          <img
            src={logoImage}
            alt="Logo"
            className="register-logo"
          />
          <h2>Cadastre-se</h2>
          <p>Gestão Financeira</p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="name">Nome</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="Digite seu nome"
            />
          </div>

          <div className="input-group">
            <label htmlFor="email">E-mail</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="Digite seu e-mail"
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
              placeholder="Crie sua senha"
            />
          </div>

          <button type="submit">Cadastrar</button>

          <div className="login-text">
            <p>Já tem uma conta? <Link to="/">Faça login</Link></p>
          </div>
        </form>
      </div>
    </div>
  );
}
