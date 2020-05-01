import React from 'react'
import ResultList from './ResultList'
import EditForm from './EditForm'

class AddMovie extends React.Component{
    constructor(){
        super()
        this.state={
            pressed:false,
            query:"",
            resultlist:[],
            loading:false,
            selected:null
        }
        this.handleQueryChange=this.handleQueryChange.bind(this)
        this.handleClick=this.handleClick.bind(this)
        this.selectMovie=this.selectMovie.bind(this)
        this.keydown=this.keydown.bind(this)
        this.callbackFunction=this.callbackFunction.bind(this)
    }
    callbackFunction(){
        this.setState({
            pressed:false,
            query:"",
            resultlist:[],
            loading:false,
            selected:null
        })
    }
    handleQueryChange(event){
        this.setState({"query":event.target.value})
        if(event.target.value===""){
            this.setState({"pressed":false,"selected":null})
        }
    }
    handleClick(){
        this.setState({'pressed':true,'loading':true})
        let url='https://api.themoviedb.org/3/search/movie?api_key=f725f4ceb85271cb3b3178b08a452b87&query='+this.state.query
        fetch(url)
        .then(response=>response.json())
        .then(data=>this.setState({'resultlist':data.results}))
        .then(this.setState({'loading':false}))
    }   
    keydown(event){
        if (event.keyCode === 13)
            document.getElementsByClassName('search-button')[0].click()
    }
    selectMovie(event){
        if(event.target.className==="movie-container"){
            for(let i=0;i<this.state.resultlist.length;i++){
                if(event.target.innerText===this.state.resultlist[i].original_title){
                    this.setState({'selected':this.state.resultlist[i]})
                    break
                }
            }
        }
        else if(event.target.className==="poster"){
            for(let i=0;i<this.state.resultlist.length;i++){
                if(event.target.attributes['alt'].value===this.state.resultlist[i].poster_path){
                    this.setState({'selected':this.state.resultlist[i]})
                    break
                }
            }
        }
        else{
            for(let i=0;i<this.state.resultlist.length;i++){
                if(event.target.textContent===this.state.resultlist[i].original_title){
                    this.setState({'selected':this.state.resultlist[i]})
                    break
                }
            }
        }
    }
    render(){
        console.log(this.state.resultlist)
            return(
            <div className="main-component">
                <div className="intro">
                    <h1>Add a movie</h1>
                    <p>Search for the name of the movie</p>
                </div>
                <div className="search-container">
                    <input type="text" 
                    className="search-bar" 
                    placeholder="Enter movie name" 
                    value={this.state.query} 
                    onChange={this.handleQueryChange}
                    onKeyDown={this.keydown}/>
                </div>
                <button className="search-button" onClick={this.handleClick} disabled={this.state.query===""}>Search</button>
                {this.state.selected!==null?<EditForm callbackFunction={this.callbackFunction} info={this.state.selected}/>
                    :this.state.pressed?(this.state.loading?"Loading":<ResultList results={this.state.resultlist} onClickFunction={this.selectMovie}/>):""}
            </div>
            )
    }
}

export default AddMovie