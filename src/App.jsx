import { useCallback, useState } from 'react';
import debounce from 'just-debounce-it';
import { Movies } from './components';
import { useMovie, useSearch } from './hooks';

import './App.css'

function App() {

  const [sort, setSort] = useState(false)
  const { query, setQuery } = useSearch();
  const { movies, getMovies, loading, error } = useMovie({ query, sort });

  const handleSubmit = (event) => {
    event.preventDefault()
    getMovies({ query })
  }

  const debounceGetMovies = useCallback(debounce(( query ) => {
    getMovies({ query })
    }, 500 )
  ,[getMovies])

  const handleSort = () => {
    setSort(!sort)
  }

  const handleChange = (event) => {
    const newQuery = event.target.value;
    if( newQuery.startsWith(' ') ) return; // Validar antes de setear el state
    setQuery( newQuery );
    debounceGetMovies( newQuery )
  }

  return (
    <div className="div-container">
      <header>
        <h1>Buscador de filmes</h1>
        <form onSubmit={ handleSubmit } action="">
          <input 
            type="text" 
            placeholder="Avenger, The matrix, Avatar..."
            onChange={handleChange}
            value={query}
            name='query'
          />
          <input type="checkbox" onChange={handleSort} checked={sort} />
          <button>Procurar</button>
        </form>
        { error && <p style={{ color:'red' }}>{ error }</p> }
      </header>

      <main>
        {
          loading ? <p>Loading...</p> : <Movies movies={ movies }/>
        }
      </main>
    </div>
  )
}

export default App
