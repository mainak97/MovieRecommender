import os
from flask import Flask,jsonify,request
from flask_sqlalchemy import SQLAlchemy
from flask_marshmallow import Marshmallow
from flask_cors import CORS
import pandas as pd
import numpy as np
from sklearn.feature_extraction.text import CountVectorizer
from sklearn.metrics.pairwise import cosine_similarity


app = Flask(__name__)
CORS(app)
basedir = os.path.abspath(os.path.dirname(__file__))
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///'+os.path.join(basedir, 'movie_recommendations.db')
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)
ma = Marshmallow(app)


class Movie(db.Model):
    __tablename__='Movie'
    Id = db.Column(db.Integer, primary_key=True,autoincrement=False)
    original_title=db.Column(db.String())
    poster_path=db.Column(db.String())
    def __init__(self,Id,original_title,poster_path):
        self.Id=Id
        self.original_title=original_title
        self.poster_path=poster_path
    def __repr__(self):
        return str(self.Id)

class MovieTags(db.Model):
    __tablename__='Tags'
    Id=db.Column(db.Integer,primary_key=True,autoincrement=False)
    tags=db.Column(db.String())
    def __init__(self,Id,tags):
        self.Id=Id
        self.tags=tags
    def to_dict(self):
        return {
            'Id':self.Id,
            'tags':self.tags
        }
class Index(db.Model):
    __tablename__='Index_table'
    Numb=db.Column(db.Integer,primary_key=True,autoincrement=True)
    Id=db.Column(db.Integer)
    def __init__(self,Id):
        self.Id=Id
    def __repr__(self):
        return str(self.Numb)+' '+str(self.Id)

class MovieSchema(ma.Schema):
    class Meta:
        fields = ('Id','original_title','poster_path')

movies_schema=MovieSchema(many=True)
movie_schema=MovieSchema()

@app.route('/addmovie',methods=['POST'])
def add_movie():
    Id=request.json['id']
    print(Id)
    x=Movie.query.filter(Movie.Id==Id).all()
    original_title=request.json['original_title']
    poster_path=request.json['poster_path']
    tags=request.json['tags']
    if len(x)==0:
        new_movie=Movie(Id,original_title,poster_path)
        new_tag=MovieTags(Id,tags)
        new_index=Index(Id)
        db.session.add(new_movie)
        db.session.add(new_tag)
        if len(Index.query.filter(Index.Id==Id).all())==0:
            db.session.add(new_index)
        db.session.commit()
        tags=MovieTags.query.all()
        df=pd.DataFrame.from_records([s.to_dict() for s in tags])
        pos=Index.query.filter(Index.Id==Id).all()[0].Numb-1
        cv=CountVectorizer()
        count_matrix=cv.fit_transform(df['tags'])
        co_sim=cosine_similarity(count_matrix[pos],count_matrix)
        similar_movies =list(enumerate(co_sim[0]))
        f=open('trained.txt','a')
        sorted_t=sorted(similar_movies,key=lambda x:x[1],reverse=True)
        for j in range(1,31):
             f.write(str(sorted_t[j][0])+','+str(sorted_t[j][1])+' ')
        f.write('\n')
        f.close()
        return movie_schema.jsonify(new_movie)
    y=MovieTags.query.filter(Movie.Id==Id).all()
    y[0].tags+=tags
    return movie_schema.jsonify(x[0])

@app.route('/search/<name>',methods=['GET'])
def get_movie(name):
    x=Movie.query.filter(Movie.original_title.startswith(name)).limit(3).all()
    print(jsonify(movies_schema.dump(x)))
    return jsonify({'data':movies_schema.dump(x)})

@app.route('/recommend/<Id>',methods=['GET'])
def reco_movie(Id):
    selected_movie_index=Index.query.filter(Index.Id==Id).all()[0].Numb
    print(selected_movie_index)
    f=open('trained.txt','r')
    movies_list=f.readlines()[selected_movie_index-1].split(' ')
    movies_list=movies_list[:len(movies_list)-1]
    movies_indexes=[]
    for i in movies_list:
        temp=int(i.split(',')[0])+1
        movies_indexes.append(Index.query.filter(Index.Numb==temp).all()[0])
    movies_objects=[]
    for i in movies_indexes:
        movies_objects.append(Movie.query.filter(Movie.Id==i.Id).all()[0])
    f.close()
    return jsonify({'data':movies_schema.dump(movies_objects)})


if __name__=='__main__':
    app.run(debug=True)