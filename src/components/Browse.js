import React from 'react'
import Header from './Header'
import useNowPlayingMovies from '../hooks/useNowPlayingMovies'
import MainContainer from './MainContainer';
import SecondaryContainer from './SecondaryContainer';
import useNowPopularMovies from '../hooks/useNowPopularMovies';
import useTopRatedMovies from '../hooks/useTopRatedMovies';


const Browse = () => {

  // we are using custom hook to fetch data of now-playing movies from TMDB
    useNowPlayingMovies();
    useNowPopularMovies();
    useTopRatedMovies();
   

  return (
    <div>
      <Header/>
      <>
        <MainContainer/>
        <SecondaryContainer/>
      </>
      {/* 
        Main Container
          - VideoBackground
          - VideoTitle
        Secondary Container
          - MovieList * n
          - cards * n
       */}
    </div>
  )
}

export default Browse