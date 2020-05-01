import React from 'react'
import ResultComponent from './ResultComponent'

class MainComponent extends React.Component{
    constructor(){
        super()
        this.state={
            selected: null,
            queryloading: false,
            query:"",
            suggestions:[]
        }
        this.handleQueryChange=this.handleQueryChange.bind(this)
        this.handleSelection=this.handleSelection.bind(this)
    }
    handleQueryChange(event){
        this.setState({"selected":null})
        if(event.target.value==="")
            this.setState({"query":event.target.value,"suggestions":[]})
        else{
            this.setState({"query":event.target.value,"queryloading":true})
            fetch('http://127.0.0.1:5000/search/'+event.target.value).then(response=>response.json())
            .then(data=>this.setState({'suggestions':data.data,'queryloading':false}))
        }
    }
    handleSelection(event){
        console.log(event.target)
        for(let i=0;i<this.state.suggestions.length;i++){
            if(this.state.suggestions[i].Id===Number(event.target.attributes['index'].value)){
                this.setState({"query":this.state.suggestions[i].original_title,"selected":this.state.suggestions[i]})
                break
            }
        }
    }
    render(){
        let suggestionslist;
        if(this.state.selected!==null){
            suggestionslist=<ResultComponent movie={this.state.selected}/>
        }
        else{
            if(!this.state.queryloading && this.state.query.length!==0){
                if(this.state.suggestions.length===0)
                    suggestionslist=<h3>No movies found</h3>
                else
                    suggestionslist=this.state.suggestions.map((i)=> 
                    {return (
                        <div key={i.Id} index={i.Id} onClick={this.handleSelection} className="suggestion-item">
                            <img className="suggestions-poster" index={i.Id} src={'https://image.tmdb.org/t/p/original'+i.poster_path} alt={i.poster_path}/>
                            <h3 index={i.Id}>{i.original_title}</h3>
                        </div>
                    )})
            }
            else if(this.state.queryloading){
                suggestionslist=<h3>Loading</h3>
            }
        }
        return(
            <div className="main-component">
                <div className="intro">
                    <h1>Welcome to Movie Recommender</h1>
                    <p>Please select a movie</p>
                </div>
                <div className="search-container">
                    <input className={(this.state.query==="")?"search-bar":"search-bar-filled"} 
                    type="text" 
                    value={this.state.query} 
                    placeholder="Enter movie name" 
                    onChange={this.handleQueryChange}/>
                    <div className={this.state.selected===null?"suggestions-list":"result-component"}>
                        {suggestionslist}
                    </div>
                </div>
            </div>
        )
    }
}

export default MainComponent