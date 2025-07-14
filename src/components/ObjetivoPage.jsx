import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logoImage from '../assets/imagens/gestao_.png';
import editarIcon from '../assets/imagens/editar.png';
import '../styles/ObjetivoPage.css';
import excluirIcon from '../assets/imagens/lixo.png';


const EditarObjetivoForm = ({ objetivo, onClose, onSave }) => {
    const [descricao, setDescricao] = useState(objetivo.descricao);
    const [dtInicial, setDtInicial] = useState(objetivo.dt_inicial);
    const [dtLimite, setDtLimite] = useState(objetivo.dt_limite);
    const [vlrObjetivo, setVlrObjetivo] = useState(objetivo.vlr_objetivo);

    const handleSubmit = async (e) => {
        e.preventDefault();
        await onSave({
            descricao,
            dt_inicial: dtInicial,
            dt_limite: dtLimite,
            vlr_objetivo: parseFloat(vlrObjetivo),
        });
    };

    return (
        <div className="editar-modal-bg">
            <div className="form-container quadro">
                <h2>Editar Objetivo</h2>
                <form onSubmit={handleSubmit}>
                    <label>Descrição</label>
                    <textarea
                        value={descricao}
                        onChange={(e) => setDescricao(e.target.value)}
                    />
                    <label>Data Inicial</label>
                    <input
                        type="date"
                        value={dtInicial}
                        onChange={(e) => setDtInicial(e.target.value)}
                    />
                    <label>Data Limite</label>
                    <input
                        type="date"
                        value={dtLimite}
                        onChange={(e) => setDtLimite(e.target.value)}
                    />
                    <label>Valor do Objetivo</label>
                    <input
                        type="number"
                        value={vlrObjetivo}
                        onChange={(e) => setVlrObjetivo(e.target.value)}
                    />
                    <div style={{ display: 'flex', gap: '10px', justifyContent: 'center' }}>
                        <button className="salvar-btn" type="submit">
                            Salvar
                        </button>
                        <button className="cancelar-btn" type="button" onClick={onClose}>
                            Cancelar
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

const ObjetivoPage = () => {
    const navigate = useNavigate();
    const [objetivos, setObjetivos] = useState([]);
    const [editandoObj, setEditandoObj] = useState(null);

    useEffect(() => {
        const fetchObjetivos = async () => {
            const token = localStorage.getItem('token');
            if (!token) {
                navigate('/login');
                return;
            }
            try {
                const response = await fetch('http://localhost:8000/objetivos/', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                if (response.ok) {
                    const data = await response.json();
                    console.log('Objetivos recebidos:', data); // Debug para ver os dados
                    setObjetivos(data);
                } else if (response.status === 401) {
                    alert('Sessão expirada. Faça login novamente.');
                    navigate('/login');
                } else {
                    alert('Erro ao carregar objetivos.');
                    setObjetivos([]);
                }
            } catch (error) {
                alert('Erro ao carregar objetivos.');
                setObjetivos([]);
                console.error(error);
            }
        };

        fetchObjetivos();
    }, [navigate]);

    const handleNovoObjetivo = () => {
        navigate('/objetivos/novo');
    };

    const handleEditarClick = (obj) => {
        setEditandoObj(obj);
    };

    const handleSalvarEdicao = async (dadosAtualizados) => {
        const idUsuario = localStorage.getItem('id_usuario'); // pega do localStorage

        if (!idUsuario) {
            alert('Você precisa estar logado para editar');
            navigate('/login');
            return;
        }

        try {
            const response = await fetch(`http://localhost:8000/objetivos/${editandoObj.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'X-User-Id': idUsuario, // envia o id do usuário no header
                },
                body: JSON.stringify(dadosAtualizados),
            });

            if (response.ok) {
                setObjetivos(objetivos.map((obj) =>
                    obj.id === editandoObj.id ? { ...obj, ...dadosAtualizados } : obj
                ));
                setEditandoObj(null);
            } else {
                alert('Erro ao editar objetivo');
            }
        } catch (error) {
            alert('Erro ao editar objetivo');
            console.error(error);
        }
    };

    const handleExcluirObjetivo = async (id) => {
        const confirmar = window.confirm('Tem certeza que deseja excluir este objetivo?');
        if (!confirmar) return;

        try {
            const token = localStorage.getItem('token');
            const response = await fetch(`http://localhost:8000/objetivos/${id}`, {
                method: 'DELETE',
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (response.ok) {
                setObjetivos(objetivos.filter(obj => obj.id !== id));
            } else {
                alert('Erro ao excluir objetivo.');
            }
        } catch (error) {
            console.error("Erro na requisição:", error);
            alert('Erro na exclusão do objetivo.');
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
                </ul>
            </div>

            {/* Página de objetivos */}
            <div className="content-container">
                <h1>Objetivos Financeiros</h1>
                <button className="btn-novoObjetivo" onClick={handleNovoObjetivo}>
                    Novo Objetivo
                </button>

                <div className="tabela-objetivos-centralizada">
                    {objetivos.length === 0 ? (
                        <p>Nenhum objetivo cadastrado.</p>
                    ) : (
                        <table className="tabela-objetivos">
                            <thead>
                                <tr>
                                    <th>Descrição</th>
                                    <th>Data Inicial</th>
                                    <th>Data Limite</th>
                                    <th>Valor</th>
                                    <th>Ações</th>
                                </tr>
                            </thead>
                            <tbody>
                                {objetivos.map((obj) => (
                                    <tr key={obj.id || obj.descricao}>
                                        <td>{obj.descricao}</td>
                                        <td>{obj.dt_inicial}</td>
                                        <td>{obj.dt_limite}</td>
                                        <td>R$ {obj.vlr_objetivo}</td>
                                        <td>
                                            <button
                                                className="acao-btn"
                                                onClick={() => handleEditarClick(obj)}
                                                style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer' }}
                                            >
                                                <img src={editarIcon} alt="Editar" style={{ width: 22, height: 20 }} />

                                            </button>
                                            <button
                                                className="acao-btn"
                                                onClick={() => handleExcluirObjetivo(obj.id)}
                                                style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer' }}
                                            >
                                                <img src={excluirIcon} alt="Excluir" style={{ width: 20, height: 20 }} />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                </div>

                {editandoObj && (
                    <EditarObjetivoForm
                        objetivo={editandoObj}
                        onClose={() => setEditandoObj(null)}
                        onSave={handleSalvarEdicao}


                    />
                )}

            </div>
        </div>
    );
};


export default ObjetivoPage;
