import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logoImage from '../assets/imagens/gestao_.png';
import editarIcon from '../assets/imagens/editar.png';
import '../styles/CategoriaPage.css'; // crie esse CSS se ainda não tiver

const EditarCategoriaForm = ({ categoria, onClose, onSave }) => {
  const [descricao, setDescricao] = useState(categoria.descricao);
  const [tpMovimentacao, setTpMovimentacao] = useState(categoria.tp_movimentacao);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await onSave({
      tp_movimentacao: tpMovimentacao,
      descricao: descricao
    });
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
    <div className="editar-modal-bg">
      <div className="form-container quadro">
        <h2>Editar Categoria</h2>
        <form onSubmit={handleSubmit}>
          <label>Tipo de Movimentação</label>
          <select value={tpMovimentacao} onChange={(e) => setTpMovimentacao(e.target.value)}>
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

          <div className="form-actions">
            <button className="salvar-btn" type="submit">Salvar</button>
            <button className="cancelar-btn" type="button" onClick={onClose}>Cancelar</button>
          </div>
        </form>
      </div>
    </div>
  );
};

const CategoriaPage = () => {
  const navigate = useNavigate();
  const [categorias, setCategorias] = useState([]);
  const [editandoCat, setEditandoCat] = useState(null);

  useEffect(() => {
    const fetchCategorias = async () => {
      try {
        const response = await fetch('http://localhost:8000/api/v1/categorias/');
        const data = await response.json();
        setCategorias(data);
      } catch (error) {
        console.error('Erro ao buscar categorias:', error);
      }
    };
    fetchCategorias();
  }, []);

  const handleNovaCategoria = () => {
    navigate('/categorias/nova'); // depois vamos criar essa tela
  };

  const handleEditarClick = (cat) => {
    setEditandoCat(cat);
  };

  const handleSalvarEdicao = async (dadosAtualizados) => {
    try {
      const response = await fetch(`http://localhost:8000/api/v1/categorias/${editandoCat.id_categoria}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(dadosAtualizados),
      });

      if (response.ok) {
        setCategorias(categorias.map((cat) =>
          cat.id_categoria === editandoCat.id_categoria
            ? { ...cat, ...dadosAtualizados }
            : cat
        ));
        setEditandoCat(null);
      } else {
        alert('Erro ao editar categoria');
      }
    } catch (error) {
      alert('Erro ao editar categoria');
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
            <Link to="/categorias" className="nav-link active">
              <i className="fas fa-tags"></i> Categorias
            </Link>
          </li>
        </ul>
      </div>

      {/* Conteúdo principal */}
      <div className="content-container">
        <h1>Categorias</h1>
        <button className="btn-novoObjetivo" onClick={handleNovaCategoria}>
          Nova Categoria
        </button>

        <div className="tabela-objetivos-centralizada">
          {categorias.length === 0 ? (
            <p>Nenhuma categoria cadastrada.</p>
          ) : (
            <table className="tabela-objetivos">
              <thead>
                <tr>
                  <th>Tipo</th>
                  <th>Descrição</th>
                  <th>Ações</th>
                </tr>
              </thead>
              <tbody>
                {categorias.map((cat) => (
                  <tr key={cat.id_categoria}>
                    <td>{cat.tp_movimentacao === 'E' ? 'Entrada' : 'Saída'}</td>
                    <td>{cat.descricao}</td>
                    <td>
                      <button
                        className="acao-btn"
                        onClick={() => handleEditarClick(cat)}
                        style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer' }}
                      >
                        <img src={editarIcon} alt="Editar" style={{ width: 22, height: 20 }} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        {editandoCat && (
          <EditarCategoriaForm
            categoria={editandoCat}
            onClose={() => setEditandoCat(null)}
            onSave={handleSalvarEdicao}
          />
        )}
      </div>
    </div>
  );
};

export default CategoriaPage;
