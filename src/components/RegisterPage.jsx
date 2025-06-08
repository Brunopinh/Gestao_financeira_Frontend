import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import logoImage from '../assets/imagens/gestao_.png';
import '../styles/RegisterPage.css'; // Certifique-se de que o caminho está correto
import { register } from '../services/api'; // Importa a função de registro do serviço API
import { useNavigate } from 'react-router-dom';


export default function RegisterPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    username: '', // campo username ou usuario 
    phone: '',
    birthDate: '',
    password: ''
  });

  const navigate = useNavigate(); // Para redirecionar após login


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { name, email, username, phone, birthDate, password } = formData;
    console.log('Tentando cadastrar usuário:', { name, email, username, phone, birthDate, password });

    if (!formData.name || !formData.email || !formData.username || !formData.phone || !formData.birthDate || !formData.password) {
      alert('Por favor, preencha todos os campos');
      return;
    }

    try {
      const userPayload = {
        nome: name,
        email: email,
        telefone: phone,
        login: username,
        senha: password,
        dt_nascimento: birthDate
      }; // usa formData como argumento{

      const userData = await register(userPayload);
      navigate('/');
    } catch (error) {
      alert('Erro ao cadastrar usuário. Por favor, tente novamente.');
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
            <label htmlFor="username">Usuário</label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleInputChange}
              placeholder="Digite seu nome de usuário"
            />
          </div>

          <div className="input-row">
            <div className="input-group">
              <label htmlFor="phone">Telefone</label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                placeholder="Digite seu telefone"
              />
            </div>

            <div className="input-group">
              <label htmlFor="birthDate">Data de Nascimento</label>
              <input
                type="date"
                id="birthDate"
                name="birthDate"
                value={formData.birthDate}
                onChange={handleInputChange}
              />
            </div>
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
