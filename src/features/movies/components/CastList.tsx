import { useRef } from 'react'
import type { CastMember } from '../types/credits.types'
import placeholderPoster from '/src/assets/img/placeholder-poster-movies.png'
import { Link } from 'react-router-dom'
import { getImageUrl } from '../services/tmdbAPI'

interface CastListProps {
  cast: CastMember[]
}

export default function CastList({ cast }: CastListProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null)

  const mainCast = cast.slice().sort((a, b) => a.order - b.order).slice(0, 15)

  if (mainCast.length === 0) return null

  const handleScroll = (direction: 'left' | 'right') => {
    scrollContainerRef.current?.scrollBy({
      left: direction === 'left' ? -300 : 300,
      behavior: 'smooth',
    })
  }

  return (
    <div>
      <h2 className="text-lg font-bold text-white mb-4">Reparto principal</h2>

      <div className="relative group">
        <button
          onClick={() => handleScroll('left')}
          aria-label="Desplazar reparto hacia la izquierda"
          className="absolute -left-3 top-22 -translate-y-1/2 z-10 w-9 h-9 rounded-full bg-slate-900/90 text-white border border-slate-700 hover:bg-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity"
        >
          ‹
        </button>

        <div
          ref={scrollContainerRef}
          className="flex gap-4 overflow-x-auto pb-2 scroll-smooth scrollbar-none"
        >
          {mainCast.map((person) => {
            const photoUrl = getImageUrl(person.profile_path, "w185") ?? placeholderPoster

            return (
              <Link key={person.id} to={`/actor/${person.id}`}>
                <div className="w-28 shrink-0">
                  <div className="aspect-2/3 rounded-lg overflow-hidden border border-white/5 bg-[#000000]/40">
                    <img src={photoUrl} alt={person.name} className="w-full h-full object-cover" loading="lazy"/>
                  </div>
                  <p className="text-sm font-semibold text-white mt-2 line-clamp-1">
                    {person.name}
                  </p>
                  <p className="text-xs text-gray-400 line-clamp-1">
                    {person.character}
                  </p>
                </div>
              </Link>
            )
          })}
        </div>

        <button onClick={() => handleScroll('right')} aria-label="Desplazar reparto hacia la derecha" className="absolute -right-3 top-22 -translate-y-1/2 z-10 w-9 h-9 rounded-full bg-slate-900/90 text-white border border-slate-700 hover:bg-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity">
          ›
        </button>
      </div>
    </div>
  )
}