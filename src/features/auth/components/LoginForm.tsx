import { useState } from "react"
import { signIn } from "../services/authService"
import { FirebaseError } from "firebase/app"
import type { FormEvent } from "react"
import { useNavigate, useLocation } from "react-router-dom"
import { loginWithGoogle } from "../services/authService"
import googleIcon from '/src/assets/icons/google-G-icon.png'

export default function LoginForm(){
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState<string | null>(null)
    const navigate = useNavigate()

    const location = useLocation()
    const from = (location.state as { from?: string } | null)?.from || "/profile"

    async function handleSubmit(e: FormEvent){
        e.preventDefault()
        setError(null)

        try {
        await signIn(email, password)
        navigate(from)
        } catch (err) {
        if (err instanceof FirebaseError && err.code === "auth/invalid-credential") {
            setError("Email o contraseña incorrectos")
        } else {
            setError("No se ha podido iniciar sesión")
        }
        }
    }

    async function handleGoogleLogin(){
    setError(null)
    try {
      await loginWithGoogle()
      navigate("/profile")
    } catch (err) {
      setError("No se ha podido iniciar sesión con Google")
    }
  }

    return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1.5">
          Email
        </label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          placeholder="tu@email.com"
          className="w-full px-4 py-2.5 bg-black/30 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-[#E50914] focus:ring-1 focus:ring-[#E50914] transition-all"/>
      </div>

      <div>
        <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-1.5">
          Contraseña
        </label>
        <input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          minLength={6}
          placeholder="••••••••"
          className="w-full px-4 py-2.5 bg-black/30 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-[#E50914] focus:ring-1 focus:ring-[#E50914] transition-all"/>
      </div>

      {error && (
        <div role="alert" className="p-3 bg-[#B20710]/20 border border-[#B20710] text-red-200 rounded-lg text-sm text-center">
          <p>{error}</p>
        </div>
      )}

      <button
        type="submit"
        className="w-full py-2.5 mt-2 bg-[#E50914] hover:bg-[#B20710] text-white font-medium rounded-lg transition-colors duration-200 shadow-md focus:outline-none focus:ring-2 focus:ring-[#E50914]/50">
        Iniciar sesión
      </button>

      <div className="relative my-2">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-white/10"></div>
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-[#1D2244] px-2 text-gray-400">O</span>
        </div>
      </div>

      <button
        type="button"
        onClick={handleGoogleLogin}
        className="w-full py-2.5 bg-white/10 hover:bg-white/20 border border-white/10 text-white font-medium rounded-lg transition-colors duration-200 flex items-center justify-center gap-2 shadow-sm">
        <img src={googleIcon} alt="" className="w-6 h-6" />
        Iniciar sesión con Google
      </button>
    </form>
  )
}