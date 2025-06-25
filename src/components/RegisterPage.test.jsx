import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import RegisterPage from './RegisterPage';
import { BrowserRouter } from 'react-router-dom';
import * as api from '../services/api';

// Mock do navigate
const mockedNavigate = vi.fn();
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: () => mockedNavigate
  };
});

// Mock da função de registro
vi.mock('../services/api', () => ({
  register: vi.fn()
}));

function renderWithRouter(ui) {
  return render(<BrowserRouter>{ui}</BrowserRouter>);
}

describe('RegisterPage', () => {
  it('deve renderizar todos os campos de input', () => {
    renderWithRouter(<RegisterPage />);

    expect(screen.getByLabelText(/nome/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/e-mail/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/usuário/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/telefone/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/data de nascimento/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/senha/i)).toBeInTheDocument();
  });

  it('deve alertar se o formulário for enviado com campos vazios', () => {
    window.alert = vi.fn(); // mock do alert
    renderWithRouter(<RegisterPage />);
    fireEvent.click(screen.getByRole('button', { name: /cadastrar/i }));
    expect(window.alert).toHaveBeenCalledWith('Por favor, preencha todos os campos');
  });

  it('deve enviar o formulário com dados válidos e redirecionar', async () => {
    const mockUser = {
      nome: 'João',
      email: 'joao@email.com',
      telefone: '99999999',
      login: 'joao123',
      senha: 'senha123',
      dt_nascimento: '2000-01-01'
    };

    api.register.mockResolvedValueOnce({ id: 1, ...mockUser });

    renderWithRouter(<RegisterPage />);

    fireEvent.change(screen.getByLabelText(/nome/i), { target: { value: mockUser.nome } });
    fireEvent.change(screen.getByLabelText(/e-mail/i), { target: { value: mockUser.email } });
    fireEvent.change(screen.getByLabelText(/usuário/i), { target: { value: mockUser.login } });
    fireEvent.change(screen.getByLabelText(/telefone/i), { target: { value: mockUser.telefone } });
    fireEvent.change(screen.getByLabelText(/data de nascimento/i), { target: { value: mockUser.dt_nascimento } });
    fireEvent.change(screen.getByLabelText(/senha/i), { target: { value: mockUser.senha } });

    fireEvent.click(screen.getByRole('button', { name: /cadastrar/i }));

    await waitFor(() => {
      expect(api.register).toHaveBeenCalledWith({
        nome: mockUser.nome,
        email: mockUser.email,
        telefone: mockUser.telefone,
        login: mockUser.login,
        senha: mockUser.senha,
        dt_nascimento: mockUser.dt_nascimento
      });

      expect(mockedNavigate).toHaveBeenCalledWith('/');
    });
  });

  it('deve alertar erro se o cadastro falhar', async () => {
    api.register.mockRejectedValueOnce(new Error('Erro no servidor'));
    window.alert = vi.fn();

    renderWithRouter(<RegisterPage />);

    fireEvent.change(screen.getByLabelText(/nome/i), { target: { value: 'Maria' } });
    fireEvent.change(screen.getByLabelText(/e-mail/i), { target: { value: 'maria@email.com' } });
    fireEvent.change(screen.getByLabelText(/usuário/i), { target: { value: 'maria123' } });
    fireEvent.change(screen.getByLabelText(/telefone/i), { target: { value: '111111111' } });
    fireEvent.change(screen.getByLabelText(/data de nascimento/i), { target: { value: '1995-12-31' } });
    fireEvent.change(screen.getByLabelText(/senha/i), { target: { value: 'senha123' } });

    fireEvent.click(screen.getByRole('button', { name: /cadastrar/i }));

    await waitFor(() => {
      expect(window.alert).toHaveBeenCalledWith('Erro ao cadastrar usuário. Por favor, tente novamente.');
    });
  });
});
