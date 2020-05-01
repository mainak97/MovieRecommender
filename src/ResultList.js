import React from 'react'
import MovieView from './MovieView'

function ResultList(props){
    const temp=props.results.filter(i=>i.poster_path!==null)
        .map(i=><MovieView key={i.Id} movie={i} onClickFunction={props.onClickFunction}/>)
    return (
        <div className="suggestions-container">
            {temp}
        </div>
        )
}

export default ResultList