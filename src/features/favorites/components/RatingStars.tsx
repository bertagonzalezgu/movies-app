import starFilled from '/src/assets/icons/rating-star-filled.svg'
import starOutlined from '/src/assets/icons/rating-star-outlined.svg'

interface RatingStarsProps{
  rating: number | null
  onRate: (rating: number) => void
  disabled?: boolean
}

export default function RatingStars({ rating, onRate, disabled = false }: RatingStarsProps){
  const stars = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

  return (
    <div className="w-full flex flex-col gap-2 bg-[#000000]/40 p-3 rounded-xl border border-white/10 backdrop-blur-md">
      <span className="text-xs font-semibold text-gray-400 text-center tracking-wide">
        {rating ? `Tu valoración: ${rating}/10` : "Valora esta película"}
      </span>

      <div className="flex items-center justify-between gap-0.5 w-full">
        {stars.map((star) => {
          const isFilled = rating !== null && star <= rating

          return (
            <button
              key={star}
              type="button"
              onClick={() => onRate(star)}
              disabled={disabled}
              aria-label={`Puntuar con ${star} estrella${star > 1 ? 's' : ''}`}
              className="p-0.5 transition-transform duration-200 hover:scale-125 focus:outline-none cursor-pointer group disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:scale-100"
              title={`Puntuar con ${star} estrella${star > 1 ? 's' : ''}`}>
              <img
                src={isFilled ? starFilled : starOutlined}
                alt=""
                className="w-4 h-4 sm:w-4 sm:h-4 lg:w-5 lg:h-5 object-contain transition-opacity duration-200 group-hover:opacity-100"/>
            </button>
          )
        })}
      </div>
    </div>
  )
}