import logoMovies from '../assets/icons/LOGO-MOVIES.svg'
import homeOutlined from '../assets/icons/home-outline-rounded.svg'
import homeFilled from '../assets/icons/home-rounded.svg'
import exploreOutlined from '../assets/icons/explore-outline-rounded.svg'
import exploreFilled from '../assets/icons/explore-rounded.svg'
import heartFilled from '../assets/icons/heart-filled.svg'
import heartOutlined from '../assets/icons/heart-outlined.svg'
import userOutlined from '../assets/icons/user-outline.svg'
import userFilled from '../assets/icons/user-filled.svg'
import { Link, useLocation } from 'react-router-dom'

export default function NavBar(){

    const location = useLocation()
    const cameFromFavorites = (location.state as { from?: string } | null)?.from === '/favorites'

    function isActive(url: string){
      if (url === '/favorites') {
        return location.pathname === '/favorites' || cameFromFavorites
      }
      return location.pathname === url
    }

    function isProfileActive(){
      if (cameFromFavorites) return false
      return ['/profile', '/login', '/register'].includes(location.pathname)
    }

    return (
        <>
        <section className="hidden md:flex fixed left-6 top-1/2 -translate-y-1/2 z-50 flex-col items-center w-14 h-85 justify-center gap-10 px-4 py-15 rounded-full bg-[#171B36]/80 backdrop-blur-xl border border-white/15 shadow-2xl shadow-black/60">
            <img src={logoMovies} alt="Logotipo de la app" className="absolute -top-10 left-1/2 -translate-x-1/2 z-10 w-18 h-18 max-w-none pointer-events-none drop-shadow-md"/>

            <Link to='/' aria-label="Inicio" aria-current={isActive('/') ? 'page' : undefined}>
                {isActive('/') ? (
                    <img src={homeFilled} alt="Icono casa relleno" className="w-6 h-6" />
                ) : (
                    <img src={homeOutlined} alt="Icono casa trazado" className="w-6 h-6" />
                )}
            </Link>
           
            <Link to='/explore' aria-label="Explorar" aria-current={isActive('/explore') ? 'page' : undefined}>
                {isActive('/explore') ? (
                    <img src={exploreFilled} alt="Icono brújula relleno" className="w-6 h-6" />
                ) : (
                    <img src={exploreOutlined} alt="Icono brújula trazado" className="w-6 h-6" />
                )}
            </Link>
            
            <Link to='/favorites' aria-label="Favoritos" aria-current={isActive('/favorites') ? 'page' : undefined}>
                {isActive('/favorites') ? (
                    <img src={heartFilled} alt="Icono corazón relleno" className="w-6 h-6" />
                ) : (
                    <img src={heartOutlined} alt="Icono corazón trazado" className="w-6 h-6" />
                )}
            </Link>
                          

            <Link to='/profile' aria-label="Perfil" aria-current={isProfileActive() ? 'page' : undefined}>
                {isProfileActive() ? (
                    <img src={userFilled} alt="Icono usuario relleno" className="w-6 h-6" />
                ) : (
                    <img src={userOutlined} alt="Icono usuario trazado" className="w-6 h-6" />
                )}
            </Link>
            
        </section>

        <section className="md:hidden fixed bottom-6 left-1/2 -translate-x-1/2 z-50 w-[90%] max-w-sm">
            <img
            src={logoMovies}
            alt="Logotipo de la app"
            className="absolute -top-11 left-1/2 -translate-x-1/2 z-10 w-22 h-22 p-2 pointer-events-none drop-shadow-[0_10px_15px_rgba(0,0,0,0.5)]"
            />

            <div className="relative flex items-center justify-between px-6 py-3 rounded-full bg-[#171B36]/80 backdrop-blur-xl border border-white/15 shadow-2xl shadow-black/60">

            <div className="absolute inset-x-8 top-0 h-px bg-linear-to-r from-transparent via-white/30 to-transparent pointer-events-none"/>

            <Link to='/' aria-label="Inicio" aria-current={isActive('/') ? 'page' : undefined}>
                {isActive('/') ? (
                    <img src={homeFilled} alt="Icono casa relleno" className="w-6 h-6" />
                ) : (
                    <img src={homeOutlined} alt="Icono casa trazado" className="w-6 h-6" />
                )}
            </Link>
           
            <Link to='/explore' aria-label="Explorar" aria-current={isActive('/explore') ? 'page' : undefined}>
                {isActive('/explore') ? (
                    <img src={exploreFilled} alt="Icono brújula relleno" className="w-6 h-6" />
                ) : (
                    <img src={exploreOutlined} alt="Icono brújula trazado" className="w-6 h-6" />
                )}
            </Link>
            
            <span className="w-8 shrink-0" />

            <Link to='/favorites' aria-label="Favoritos" aria-current={isActive('/favorites') ? 'page' : undefined}>
                {isActive('/favorites') ? (
                    <img src={heartFilled} alt="Icono corazón relleno" className="w-6 h-6" />
                ) : (
                    <img src={heartOutlined} alt="Icono corazón trazado" className="w-6 h-6" />
                )}
            </Link>
                          

            <Link to='/profile' aria-label="Perfil" aria-current={isProfileActive() ? 'page' : undefined}>
                {isProfileActive() ? (
                    <img src={userFilled} alt="Icono usuario relleno" className="w-6 h-6" />
                ) : (
                    <img src={userOutlined} alt="Icono usuario trazado" className="w-6 h-6" />
                )}
            </Link>
            
            </div>
        </section>
      </>
        
    )
}