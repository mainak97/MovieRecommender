import React from'react'

function Display(props){
    console.log(props.name)
    if(props.name===undefined){
        const style={
            'color':'brown'
        }
        return(
            <div className="display">
                <h1 style={style}>By<br/>Mainak Bose</h1>
            </div>
        )
    }
    return( 
    <div className="display">
        <img className="about-icon" src={props.logo} alt={props.name}/>
        <h3 className="about-name">{props.name}</h3>
        <a className="about-link" href={props.link}>Try {props.name}</a>
    </div>
    )
}

export default Display