import React from 'react'
import Display from './Display'

function About(){
    return(
    <div className="about-list">
        <Display name={"React"} 
        link={"https://reactjs.org/"} 
        logo={"https://cdn4.iconfinder.com/data/icons/logos-3/600/React.js_logo-512.png"}/>
        <Display name={"Flask"} 
        link={"https://flask.palletsprojects.com/en/1.1.x/"}
        logo={"https://www.todesktop.com/images/1c2437c139969ae8e4100b477fb824f1.svg"}/>
        <Display name={"Pandas"} 
        link={"https://pandas.pydata.org/"} 
        logo={"https://numfocus.org/wp-content/uploads/2016/07/pandas-logo-300.png"}/>
        <Display name={"scikit learn"} 
        link={"https://scikit-learn.org/stable/"} 
        logo={"https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/Scikit_learn_logo_small.svg/1200px-Scikit_learn_logo_small.svg.png"}/>
        <Display name={"TMDb"} 
        link={"https://www.themoviedb.org/"} 
        logo={"https://www.themoviedb.org/assets/2/v4/logos/v2/blue_square_2-d537fb228cf3ded904ef09b136fe3fec72548ebc1fea3fbbd1ad9e36364db38b.svg"}/>
        <Display name={"Kaggle"} 
        link={"https://www.kaggle.com/"} 
        logo={"https://www.analyticsvidhya.com/wp-content/uploads/2015/06/kaggle-logo-transparent-300.png"}/>
        <Display name={"SQLite"} 
        link={"https://www.sqlite.org/"} 
        logo={"https://upload.wikimedia.org/wikipedia/commons/thumb/3/38/SQLite370.svg/382px-SQLite370.svg.png"}/>
        <Display/>
    </div>
    )
}

export default About