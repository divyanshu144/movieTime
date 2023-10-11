import React from 'react'
import MovieList from './MovieList'
import { useSelector } from 'react-redux'

const SecondaryContainer = () => {
  const movies = useSelector( (store) => store.movies )
  return (
    movies.nowPlayingMovies && (
      // in-order to use z-index we have to use position property such as relative, absolute etc
    <div className="bg-black">
      <div className="-mt-52 pl-12 relative z-20">
        <MovieList title = {"Now Playing"} movies = {movies.nowPlayingMovies}/>
        <MovieList title = {"Popular"} movies = {movies.popularMovies}/>
        <MovieList title = {"Top Rated"} movies = {movies.topRatedMovies}/>
        <MovieList title = {"Award Winning"} movies = {movies.nowPlayingMovies}/>
      </div>
      {/* 
      MovieList -popular
        MovieCrads * n
      MovieList- NowPlaying
      MovieList- Trending
       */}
    </div>
    )
  )
}

export default SecondaryContainer