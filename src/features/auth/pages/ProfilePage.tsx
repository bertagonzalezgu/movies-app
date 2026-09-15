import { useLocation } from "react-router-dom"
import { useAuth } from "../context/useAuth"
import { signOut } from "../services/authService"

export default function ProfilePage(){
  const { user } = useAuth()
  const location = useLocation()
  const justRegistered = (location.state as { justRegistered?: boolean } | null)?.justRegistered

  const handleSignOut = async () => {
    try {
      await signOut()
    } catch (error) {
      console.error("Error al cerrar sesión:", error)
    }
  }

  return (
    <main className="min-h-screen bg-[#171B36] text-white px-4 py-18 md:py-10 md:pr-12 md:pl-32 transition-all">
      <header className="mb-6 border-b border-white/10 pb-4">
        <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-white">
          Mi <span className="text-[#E50914]">Perfil</span>
        </h1>
      </header>

      {justRegistered && (
        <div role="status" className="max-w-xl p-3 bg-green-500/10 border border-green-500/30 text-green-300 rounded-lg text-sm text-center mb-4">
          ¡Cuenta creada correctamente! Bienvenido/a.
        </div>
      )}

      <div className="max-w-xl bg-white/5 border border-white/10 rounded-2xl p-6 md:p-8 backdrop-blur-sm shadow-xl">
        <div className="flex items-center gap-4 mb-6">
          <div className="w-16 h-16 rounded-full bg-[#E50914] flex items-center justify-center text-xl font-bold uppercase text-white shadow-lg">
            {user?.email?.charAt(0) || "U"}
          </div>
          <div>
            <h2 className="text-xl font-semibold text-white">Usuario Registrado</h2>
            <p className="text-gray-400 text-sm">{user?.email}</p>
          </div>
        </div>

        <div className="border-t border-white/10 pt-6 flex justify-end">
          <button
            onClick={handleSignOut}
            className="px-5 py-2.5 bg-[#B20710] hover:bg-[#E50914] text-white font-medium rounded-lg transition-colors duration-200 shadow-md focus:outline-none focus:ring-2 focus:ring-[#E50914]/50">
            Cerrar sesión
          </button>
        </div>
      </div>
    </main>
  )
}