import { useCallback, useMemo, useRef, useState } from 'react';
import { searchMovie } from '../services/fetch-movies';

export function useMovie ({ query, sort }) {

    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const previosQuery = useRef( query )

    const getMovies = useCallback(async ({ query }) => {

      if( query === previosQuery.current ) return;

      try {

        setLoading( true )
        setError( null )
        previosQuery.current = query;
        const newMovies = await searchMovie({ query })
        setMovies(newMovies)

      } catch (error) {

        setError(error.message)
        
      } finally {

        setLoading( false )

      }

    },[])

    const sortedMovies = useMemo(() => {
      return sort
      ? [...movies].sort((a,b) => a.title.localeCompare(b.title))
      : movies
    },[ sort, movies] );
    
    return { movies: sortedMovies, getMovies, loading, error }
  
}