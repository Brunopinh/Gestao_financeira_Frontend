import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import logoImage from '../assets/imagens/gestao_.png';
import '../styles/CategoriaPage.css';

const NovaCategoriaPage = () => {
  const navigate = useNavigate();
  const [descricao, setDescricao] = useState('');
  const [tpMovimentacao, setTpMovimentacao] = useState('E');
  const [erro, setErro] = useState('');

  const handleSalvar = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:8000/api/v1/categorias/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          tp_movimentacao: tpMovimentacao,
          descricao: descricao,
        }),
      });

      if (response.ok) {
        navigate('/categorias');
      } else {
        const data = await response.json();
        setErro(data.detail || 'Erro ao salvar categoria');
      }
    } catch (err) {
      setErro('Erro ao conectar com o servidor.');
    }
  };
const handleExcluirCategoria = async (id_categoria) => {
  const confirmar = window.confirm('Tem certeza que deseja excluir esta categoria?');
  if (!confirmar) return;

  try {
    const response = await fetch(`http://localhost:8000/api/v1/categorias/${id_categoria}`, {
      method: 'DELETE',
    });

    const result = await response.json();

    if (response.ok) {
      // Remove a categoria da lista
      setCategorias(categorias.filter(cat => cat.id_categoria !== id_categoria));
    } else {
      alert(`Erro ao excluir: ${result.detail || result.erro}`);
    }
  } catch (error) {
    alert('Erro ao excluir categoria.');
    console.error(error);
  }
};

  return (
    <div className="d-flex">
      {/* Sidebar */}
      <div className="sidebar">
        <div className="logo-container text-center mb-4">
          <img src={logoImage} alt="Logo" height="50" />
          <h4 className="text-white mt-2">Financeiro</h4>
        </div>
        <ul className="nav">
          <li className="nav-item">
            <Link to="/home" className="nav-link">
              <i className="fas fa-home"></i> Início
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/objetivos" className="nav-link">
              <i className="fas fa-target"></i> Objetivos
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/categorias" className="nav-link">
              <i className="fas fa-tags"></i> Categorias
            </Link>
          </li>
        </ul>
      </div>

      {/* Conteúdo */}
      <div className="content-container">
        <h2>Nova Categoria</h2>

        <form className="form-container quadro" onSubmit={handleSalvar}>
          <label>Tipo de Movimentação</label>
          <select
            value={tpMovimentacao}
            onChange={(e) => setTpMovimentacao(e.target.value)}
          >
            <option value="E">Entrada</option>
            <option value="S">Saída</option>
          </select>

          <label>Descrição</label>
          <input
            type="text"
            value={descricao}
            onChange={(e) => setDescricao(e.target.value)}
            required
          />

          {erro && <p style={{ color: 'red', fontWeight: 'bold' }}>{erro}</p>}

          <div className="form-actions">
            <button type="submit" className="salvar-btn">Salvar</button>
            <button type="button" className="cancelar-btn" onClick={() => navigate('/categorias')}>
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NovaCategoriaPage;
