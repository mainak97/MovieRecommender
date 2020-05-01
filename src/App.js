import React from 'react'
import NavBar from './NavBar'
import MainComponent from './MainComponent'
import AddMovie from './AddMovie.js'
import About from './About'
import './App.css'
class App extends React.Component{
  constructor(){
    super()
    this.state={
      page:"Home"
    }
    this.pageChangeHandler=this.pageChangeHandler.bind(this)
  }
  pageChangeHandler(event){
    this.setState({page:event.target.textContent})
  }
  render(){ 
    let component;
    if(this.state.page==="Home")
      component=<div className="app-container">
        <NavBar page={this.state.page} pageChangeHandler={this.pageChangeHandler}/>
        <MainComponent/>
      </div>
    else if(this.state.page==="Add Movie")
      component=<div className="app-container">
        <NavBar page={this.state.page} pageChangeHandler={this.pageChangeHandler}/>
        <AddMovie/>
      </div>
    else
    component=<div className="app-container">
      <NavBar page={this.state.page} pageChangeHandler={this.pageChangeHandler}/>
      <About/>
    </div>
    return component
  }
}

export default App