import React, { useState } from 'react'
import { FaHeart, FaStar } from 'react-icons/fa'
import { motion } from 'framer-motion'
interface MovieCardProps {
    title: string
    genre?: string
    vote: number
    poster: string
    releaseDate: string
}

const MovieCard: React.FC<MovieCardProps> = ({
    title,
    genre,
    vote,
    poster,
    releaseDate,
}) => {
    const [isLiked, setIsLiked] = useState<boolean>(false)
    releaseDate = new Date(releaseDate).toLocaleDateString('en-us', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
    })
    const handleDoubleClick = (event: React.MouseEvent) => {
        if (event.detail === 2) {
            setIsLiked(true)
            setTimeout(() => {
                setIsLiked(false)
            }, 1000)
        }
    }

    return (
        <div
            className="relative mt-4 flex cursor-pointer flex-col transition delay-75 ease-out hover:scale-105 active:cursor-grabbing"
            onClick={handleDoubleClick}
        >
            <motion.div
                animate={{
                    y: isLiked ? 0 : -1000,
                }}
                className="absolute grid h-full w-full place-items-center"
            >
                <FaHeart className="mb-20 h-16 w-16 text-red drop-shadow-lg" />
            </motion.div>
            <img
                src={`https://image.tmdb.org/t/p/w500/${poster}`}
                alt={title}
                draggable="false"
                className={`rounded-lg shadow shadow-darkGray ${
                    isLiked && 'z-[-1] opacity-75'
                }`}
            />
            <p className="mt-4 mr-7 text-lg font-bold text-white" title={title}>
                {title}
            </p>
            <p
                className="mr-7 text-lg font-medium text-lightGray"
                title={title}
            >
                {releaseDate}
            </p>
        </div>
    )
}

export default MovieCard
