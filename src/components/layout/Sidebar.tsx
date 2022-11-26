import React from 'react'
import NavLink from './NavLink'
import { FaBook, FaHome, FaPlusSquare, FaSearch } from 'react-icons/fa'
import logo from '../../assets/img/Logo.svg'
import MovieListCard from '../UI/MovieListCard'
import CustomButton from '../UI/CustomButton'
const Sidebar = () => {
    return (
        <nav className="absolute top-0 left-0 flex h-full w-60 flex-col bg-primary">
            <img src={logo.src} alt="logo" className="ml-7 mt-10 h-4 w-24" />
            <div className="mt-7 flex w-full flex-col gap-4 px-7 ">
                <NavLink href="/">
                    <FaHome />
                    Home
                </NavLink>
                <NavLink href="/search">
                    <FaSearch />
                    Search
                </NavLink>
                <NavLink href="/library">
                    <FaBook />
                    Library
                </NavLink>
            </div>
            <p className="mx-7 mt-7 h-14 border-t-[1px] border-darkGray py-7 px-2 text-base tracking-widest text-lightGray">
                MY LISTS
            </p>
            <div className="mt-7 max-h-[470px] w-full overflow-y-auto px-7">
                <div className="flex flex-col gap-4">
                    <MovieListCard />
                    <MovieListCard />
                    <MovieListCard />
                    <MovieListCard />
                    <MovieListCard />
                    <MovieListCard />
                    <MovieListCard />
                    <MovieListCard />
                    <MovieListCard />
                    <MovieListCard />
                    <MovieListCard />
                    <MovieListCard />
                    <MovieListCard />
                </div>
            </div>
            <CustomButton styles="bg-red w-[calc(100%-56px)] h-11 my-7 ml-7 gap-2 text-base text-primary">
                <FaPlusSquare /> Create List
            </CustomButton>
        </nav>
    )
}

export default Sidebar
