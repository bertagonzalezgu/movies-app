import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import { FirebaseError } from 'firebase/app'
import RegisterForm from './RegisterForm'
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
      <RegisterForm />
    </MemoryRouter>
  )
}

describe('RegisterForm', () => {
  beforeEach(() => {
    mockNavigate.mockClear()
  })

  it('registra correctamente y redirige a /profile', async () => {
    vi.mocked(authService.signUp).mockResolvedValue(undefined)

    renderForm()

    await userEvent.type(screen.getByLabelText(/email/i), 'nuevo@test.com')
    await userEvent.type(screen.getByLabelText(/contraseña/i), '123456')
    await userEvent.click(screen.getByRole('button', { name: /registrarse/i }))

    await waitFor(() => {
      expect(authService.signUp).toHaveBeenCalledWith('nuevo@test.com', '123456')
      expect(mockNavigate).toHaveBeenCalledWith('/profile', { state: { justRegistered: true } })
    })
  })

  it('muestra un mensaje si el email ya está registrado', async () => {
    const firebaseError = new FirebaseError('auth/email-already-in-use', 'Email already in use')
    vi.mocked(authService.signUp).mockRejectedValue(firebaseError)

    renderForm()

    await userEvent.type(screen.getByLabelText(/email/i), 'repetido@test.com')
    await userEvent.type(screen.getByLabelText(/contraseña/i), '123456')
    await userEvent.click(screen.getByRole('button', { name: /registrarse/i }))

    await waitFor(() => {
      expect(screen.getByRole('alert')).toHaveTextContent(/ya está registrado/i)
    })

    expect(mockNavigate).not.toHaveBeenCalled()
  })
})