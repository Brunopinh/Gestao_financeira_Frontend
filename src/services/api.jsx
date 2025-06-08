import axios from 'axios';

// configuração do axios para se conectar à API
const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});


// Primeira função para login
export const login = async (login, senha) => {
  console.log('Tentando fazer login com:', { login, senha });
  try {
    const response = await api.post('/api/v1/auth/login', { login, senha });
    return response.data; // Retorna os dados do usuário
  } catch (error) {
    console.error('Erro ao fazer login:', error);
    throw error; // Propaga o erro para ser tratado pelo componente
  }
};

// Cadastrar usuario no Banco de Dados
export const register = async (userData) => {
    console.log('Tentando cadastrar usuário:', userData);
  try {
    const response = await api.post('/api/v1/auth/register', userData);
    return response.data; // Retorna os dados do usuário cadastrado
  } catch (error) {
    console.error('Erro ao cadastrar usuário:', error);
    throw error; // Propaga o erro para ser tratado pelo componente
  }
};