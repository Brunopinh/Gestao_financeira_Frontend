// src/pages/NovoObjetivoPage.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/NovoObjetivoPage.css';
import { parse } from 'postcss';

const NovoObjetivoPage = () => { //// Página para criar um novo objetivo
  // Estados para armazenar os dados do novo objetivo
  const [descricao, setDescricao] = useState('');
  const [dtInicial, setDtInicial] = useState('');
  const [dtLimite, setDtLimite] = useState('');
  const [vlrObjetivo, setVlrObjetivo] = useState('');
  const navigate = useNavigate();

  const usuarioId = localStorage.getItem('id_usuario'); // ou de onde você pega o id

  const criarObjetivo = async () => {
    const token = localStorage.getItem('token'); // ou de onde você salva o token JWT
    const novoObjetivo = {
      descricao: descricao,
      dt_inicial: dtInicial,
      dt_limite: dtLimite,
      vlr_objetivo: parseFloat(vlrObjetivo),
      id_usuario: parseInt(usuarioId, 10),
    };

    try {
      const response = await fetch('http://localhost:8000/objetivos/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}` // Adicione esta linha
        },
        body: JSON.stringify(novoObjetivo),
      });

      if (!response.ok) {
        throw new Error('Erro ao criar objetivo');
      }

      const data = await response.json();
      console.log('Objetivo criado:', data);

      // Redirecionar de volta para a lista de objetivos
      navigate('/objetivos');
    } catch (error) {
      console.error('Erro ao criar objetivo:', error);
    }
  };

  return (
    <div className="novo-objetivo-bg">
      <div className="form-container quadro">
        <h2>Criar Novo Objetivo</h2>
        <label>Descrição</label>
        <textarea
          placeholder="Descrição"
          value={descricao}
          onChange={(e) => setDescricao(e.target.value)}
        />
        <label>Data Inicial</label>
        <input
          type="date"
          placeholder="Data Inicial"
          value={dtInicial}
          onChange={(e) => setDtInicial(e.target.value)}
        />
        <label>Data Limite</label>
        <input
          type="date"
          placeholder="Data Limite"
          value={dtLimite}
          onChange={(e) => setDtLimite(e.target.value)}
        />
        <label>Valor do Objetivo</label>
        <input
          type="number"
          placeholder="Valor do Objetivo"
          value={vlrObjetivo}
          onChange={(e) => setVlrObjetivo(e.target.value)}
        />
        <div style={{ display: 'flex', gap: '10px', justifyContent: 'center' }}>
          <button className="salvar-btn" onClick={criarObjetivo}>
            Salvar
          </button>
          <button
            className="cancelar-btn"
            onClick={() => navigate('/objetivos')}
          >
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );
};

export default NovoObjetivoPage;

