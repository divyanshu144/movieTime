import { useEffect } from 'react'
import { API_OPTIONS } from '../utils/constants';
import { addTrailerVideo } from '../utils/moviesSlice';
import { useDispatch } from 'react-redux';

const useMovieTrailer = (movieId) => {
    const dispatch = useDispatch()

    const getMovieVideos = async () => {

        const data = await fetch(
          "https://api.themoviedb.org/3/movie/"+movieId+"/videos?language=en-US",
            API_OPTIONS
          );
        const json = await data.json()
        console.log(json);
    
        const filterTrailer = json.results.filter(video => video.type === "Trailer")
        // suppose if there is no trailer of a movie then we can take whatever the first video is there
        const trailer = filterTrailer.length ? filterTrailer[0] : json.results[0];
        console.log(trailer);
        dispatch(addTrailerVideo(trailer))
      } ;
    
      useEffect( () => {
        getMovieVideos()
      }, []);
    
}

export default useMovieTrailer