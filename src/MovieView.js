import React from 'react'

function MovieView(props){
    return( 
        <div className="movie-container" onClick={props.onClickFunction}>
            <img className="poster" src={'https://image.tmdb.org/t/p/original'+props.movie.poster_path} alt={props.movie.poster_path}/>
            <p className="movie-name">{props.movie.original_title}</p>
        </div>
    )
}

export default MovieView