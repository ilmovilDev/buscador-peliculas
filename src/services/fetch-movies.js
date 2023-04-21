const API_KEY='f2b2dda8'

export const searchMovie = async ({ query }) => {

    if( query === '' ) return null

    try {

        const response = await fetch(`https://www.omdbapi.com/?apikey=${API_KEY}&s=${query}`)
        const json = await response.json()
        const movies = json.Search;

        return movies?.map( movie => ({
            id      : movie.imdbID,
            title   : movie.Title,
            year    : movie.Year,
            poster  : movie.Poster
        }))

    } catch (error) {
        throw new Error('erro na resposta')
    }

}
