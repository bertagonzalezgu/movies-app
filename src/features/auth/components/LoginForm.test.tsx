import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import { FirebaseError } from 'firebase/app'
import LoginForm from './LoginForm'
import * as authService from '../services/authService'

vi.mock('../services/authService')

const mockNavigate = vi.fn()
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom')
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  }
})

function renderForm() {
  render(
    <MemoryRouter>
      <LoginForm />
    </MemoryRouter>
  )
}

describe('LoginForm', () => {
  beforeEach(() => {
    mockNavigate.mockClear()
  })

  it('inicia sesión correctamente y redirige', async () => {
    vi.mocked(authService.signIn).mockResolvedValue(undefined)

    renderForm()

    await userEvent.type(screen.getByLabelText(/email/i), 'usuario@test.com')
    await userEvent.type(screen.getByLabelText(/contraseña/i), '123456')
    await userEvent.click(screen.getByRole('button', { name: 'Iniciar sesión' }))

    await waitFor(() => {
      expect(authService.signIn).toHaveBeenCalledWith('usuario@test.com', '123456')
      expect(mockNavigate).toHaveBeenCalled()
    })
  })

  it('muestra un mensaje si las credenciales son incorrectas', async () => {
    const firebaseError = new FirebaseError('auth/invalid-credential', 'Invalid credential')
    vi.mocked(authService.signIn).mockRejectedValue(firebaseError)

    renderForm()

    await userEvent.type(screen.getByLabelText(/email/i), 'usuario@test.com')
    await userEvent.type(screen.getByLabelText(/contraseña/i), 'incorrecta')
    await userEvent.click(screen.getByRole('button', { name: 'Iniciar sesión' }))

    await waitFor(() => {
      expect(screen.getByRole('alert')).toHaveTextContent(/incorrectos/i)
    })

    expect(mockNavigate).not.toHaveBeenCalled()
  })
})