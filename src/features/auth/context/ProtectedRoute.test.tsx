import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import ProtectedRoute from './ProtectedRoute'
import { useAuth } from './useAuth'

vi.mock('./useAuth')

function renderProtected() {
  render(
    <MemoryRouter initialEntries={['/profile']}>
      <Routes>
        <Route path="/profile" element={
          <ProtectedRoute>
            <p>Contenido protegido</p>
          </ProtectedRoute>
        } />
        <Route path="/login" element={<p>Página de login</p>} />
      </Routes>
    </MemoryRouter>
  )
}

describe('ProtectedRoute', () => {
  it('muestra un estado de carga mientras se resuelve la sesión', () => {
    vi.mocked(useAuth).mockReturnValue({ user: null, loading: true })

    renderProtected()

    expect(screen.getByText(/cargando/i)).toBeInTheDocument()
  })

  it('redirige a /login si no hay usuario autenticado', () => {
    vi.mocked(useAuth).mockReturnValue({ user: null, loading: false })

    renderProtected()

    expect(screen.getByText('Página de login')).toBeInTheDocument()
    expect(screen.queryByText('Contenido protegido')).not.toBeInTheDocument()
  })

  it('muestra el contenido protegido si hay usuario autenticado', () => {
    vi.mocked(useAuth).mockReturnValue({ user: { uid: 'user123' } as any, loading: false })

    renderProtected()

    expect(screen.getByText('Contenido protegido')).toBeInTheDocument()
  })
})