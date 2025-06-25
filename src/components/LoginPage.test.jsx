import { render, screen, fireEvent } from '@testing-library/react'
import LoginPage from './LoginPage'
import { BrowserRouter } from 'react-router-dom'

test('renderiza o formulário de login', () => {
  render(
    <BrowserRouter>
      <LoginPage />
    </BrowserRouter>
  )

  expect(screen.getByLabelText(/usuário/i)).toBeInTheDocument()
  expect(screen.getByLabelText(/senha/i)).toBeInTheDocument()
  expect(screen.getByRole('button', { name: /entrar/i })).toBeInTheDocument()
})
