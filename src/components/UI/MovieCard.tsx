import React from 'react'
import { FaStar } from 'react-icons/fa'
import { consts } from '../../utils/consts'

interface MovieCardProps {
    title: string
    genre?: string
    vote: number
    poster: string
}

const MovieCard: React.FC<MovieCardProps> = ({
    title,
    genre,
    vote,
    poster,
}) => {
    return (
        <div className="relative flex cursor-pointer flex-col active:cursor-grabbing">
            <img
                src={`https://image.tmdb.org/t/p/w500/${poster}`}
                alt={title}
                draggable="false"
                className="rounded-lg"
            />
            <p className="mt-7 mr-7 text-lg font-bold text-white" title={title}>
                {title}
            </p>
            <p className="absolute bottom-16 right-2 flex h-12 w-12 items-center justify-center gap-1 rounded-full border-2 border-red bg-darkGray text-sm font-bold text-white">
                {vote}
                <FaStar className="mb-[2px] h-2 w-2" />
            </p>
        </div>
    )
}

export default MovieCard
