import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { signUp } from "../services/authService"
import { FirebaseError } from "firebase/app"
import type { FormEvent } from "react"

export default function RegisterForm(){
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState<string | null>(null)
    const navigate = useNavigate()

    async function handleSubmit(e: FormEvent){
        e.preventDefault()
        setError(null)

        try{
          await signUp(email, password)
          navigate("/profile", { state: { justRegistered: true } })
        } catch(err){
          if(err instanceof FirebaseError && err.code === "auth/email-already-in-use") {
            setError("Este email ya está registrado")
          } else{
            setError("No se ha podido completar el registro")
          }
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
          placeholder="Mínimo 6 caracteres"
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
        Registrarse
      </button>
    </form>
  )
}