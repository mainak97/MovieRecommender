import React from 'react'


class EditForm extends React.Component{
    constructor(props){
        super(props)
        this.state={
            'props':props,
            'sent':false
        }
        this.postform=this.postform.bind(this)
    }
    postform(){
        const data={
             method: 'POST',
             headers:{'Content-Type':'application/json','Access-Control-Allow-Origin': '*'},
             body:JSON.stringify({
                 'id':this.state.props.info.id,
                 'poster_path':this.state.props.info.poster_path,
                 'original_title':this.state.props.info.title,
                 'tags':document.getElementById('tags').value
             })
        }
        fetch('http://127.0.0.1:5000/addmovie',data)
        .then(this.setState({'sent':true}))
    }
    render(){
        let content=this.state.sent?<h1 id="add-link" onClick={this.state.props.callbackFunction}>Thank you, click on this message to add another movie.</h1>:
        (<div className="edit-form">
            <img src={'https://image.tmdb.org/t/p/original'+this.state.props.info.poster_path} alt={this.state.props.info.poster_path} className="edit-form-poster"/>
            <div className="edit-form-input">
                <h2 className="edit-form-movie-name">{this.state.props.info.original_title}</h2>
                <textarea id="tags" className="tag-input" placeholder="Enter appropriate tags and genres"/>
                <button id="submit-button" className="search-button" onClick={this.postform}>Submit</button>
            </div>       
        </div>)
        return content
    }
}

export default EditForm