import React from 'react'
import MovieView from './MovieView'
import ResultList from './ResultList'

class ResultComponent extends React.Component{
    constructor(props){
        super(props)
        this.state={
            movie:props.movie,
            resultloading:true,
            results:[]
        }
    }
    componentDidMount(){
        fetch('http://localhost:5000/recommend/'+this.state.movie.Id)
        .then(response=>response.json())
        .then(data=>this.setState({'results':data.data,'resultloading':false}))
    }
    render(){
        let temp=this.state.resultloading?<h2>Loading</h2>:<ResultList results={this.state.results}/>
        return(
            <div className="result-container">
                <MovieView movie={this.state.movie}/>
                {this.state.resultloading?"Loading":<h2>Similar Movies Are:</h2>}
                {temp}
            </div>
        )
    }
}

export default ResultComponent