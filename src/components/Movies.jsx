
function ListOfMovies ({ movies }) {
  return (
    <ul className="movies">
        {
        movies.map(movie => (
            <li key={movie.id} className="movie">
              <h3>{ movie.title.substr(0,22) }...</h3>
              <p>Ano de lanzamiento: { movie.year}</p>
              <img src={ movie.poster } alt={ movie.title } />
            </li>
        ))
        }
    </ul>
  )
}

function NoMoviesResult () {
  return (
    <p>No se encontraron películas para esta búsqueda...</p>
  )
}

export function Movies ({ movies }) {

    const hasMovies = movies?.length > 0

    return (
        hasMovies 
        ? ( <ListOfMovies movies={ movies }/> ) 
        : ( <NoMoviesResult/> )
    )
}
