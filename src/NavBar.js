import React from 'react'

function NavBar(props){
    return(<div id="nav-bar">
        <h1 id="logo">Movie Recommendations</h1>
        <div>
            <button onClick={props.pageChangeHandler} className="nav-items" id={props.page==="Home"?"selected":""}>Home</button>
            <button onClick={props.pageChangeHandler} className="nav-items" id={props.page==="Add Movie"?"selected":""}>Add Movie</button>
            <button onClick={props.pageChangeHandler} className="nav-items" id={props.page==="About"?"selected":""}>About</button>
        </div>     
    </div>)
}

export default NavBar