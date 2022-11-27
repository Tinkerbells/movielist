import React from 'react'
import { useBlazeSlider } from 'react-blaze-slider'
import { trpc } from '../../utils/trpc'
import MovieCard from './MovieCard'
import 'blaze-slider/dist/blaze.css'
import { PopularMovieResponse } from '../../types/popularResponse'

interface PopularMoviesProps {
    movies: PopularMovieResponse
}

const PopularMovies: React.FC<PopularMoviesProps> = ({ movies }) => {
    const elRef = useBlazeSlider({
        all: {
            enableAutoplay: true,
            draggable: true,
            autoplayInterval: 1500,
            stopAutoplayOnInteraction: false,
            slidesToShow: 6,
            slidesToScroll: 1,
        },
        '(max-width: 480px)': {
            slidesToShow: 1,
        },
        '(max-width: 620px)': {
            slidesToShow: 2,
        },
        '(max-width: 768px)': {
            slidesToShow: 3,
        },
        '(max-width: 1060px)': {
            slidesToShow: 4,
        },
        '(max-width: 1200px)': {
            slidesToShow: 5,
        },
        '(min-width: 1700px)': {
            slidesToShow: 6,
        },
        '(min-width: 2300px)': {
            slidesToShow: 10,
        },
    })
    return (
        <div className="blaze-slider" ref={elRef}>
            <p className="mb-2 ml-2 text-base tracking-widest text-lightGray">
                POPULAR MOVIES
            </p>
            <div className="blaze-container">
                <div className="blaze-track-container">
                    <div className="blaze-track mb-4 px-2">
                        {movies.results.map((movie) => (
                            <MovieCard
                                title={movie.title}
                                vote={movie.vote_average}
                                poster={movie.poster_path}
                                releaseDate={movie.release_date}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PopularMovies
