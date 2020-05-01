from sqlalchemy import Column, Integer, Float, Date, String
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
import pandas as pd
import json
import re
import numpy as np


Base = declarative_base()

class Movie(Base):
    __tablename__='Movie'
    Id=Column(Integer,primary_key=True,autoincrement=False)
    original_title=Column(String(200))
    poster_path=Column(String(200))
    def __init__(self,Id,original_title,poster_path):
        self.Id=Id
        self.original_title=original_title
        self.poster_path=poster_path
    def __repr__(self):
        return self.original_title

class MovieTags(Base):
    __tablename__='Tags'
    Id=Column(Integer,primary_key=True,autoincrement=False)
    tags=Column(String(5000))
    def __init__(self,Id,tags):
        self.Id=Id
        self.tags=tags

class Index(Base):
    __tablename__='Index_table'
    Numb=Column(Integer,primary_key=True,autoincrement=True)
    Id=Column(Integer)
    def __init__(self,Id):
        self.Id=Id
    def __repr__(self):
        print(str(Numb)+' '+str(Id))

engine = create_engine('sqlite:///movie_recommendations.db')
Base.metadata.create_all(engine)
session = sessionmaker()
session.configure(bind=engine)
s = session()

movies=s.query(Movie).all()
for i in movies:
    index=Index(i.Id)
    s.add(index)
s.commit()


# df4=pd.read_csv('final.csv')
# for index,row in df4.iterrows():
#     if pd.isnull(row['id']) or pd.isnull(row['poster_path']) or pd.isnull(row['original_title']) or (pd.isnull(row['genres']) and pd.isnull(row['keywords']) and pd.isnull(row['crew'])):
#         continue
#     movie=Movie(row['id'],row['original_title'],row['poster_path'])
#     tags=""
#     if pd.isnull(row['genres'])!=True:
#         tags+=row['genres']
#     if pd.isnull(row['crew'])!=True:
#         tags+=row['crew']
#     if pd.isnull(row['keywords'])!=True:
#         tags+=row['keywords']
#     movie_tag=MovieTags(row['id'],tags)
#     if s.query(Movie).get(row['id']) is None:
#         s.add(movie)
#     if s.query(MovieTags).get(row['id']) is None:
#         s.add(movie_tag)
#     print(index)
# s.commit()

#df1=pd.read_csv('movies_metadata_processed.csv',dtype={"id": "string", "genres":"string","orignal_title": "string", "poster_path":"string"},usecols=["id","genres","original_title","poster_path"])
#df2=pd.read_csv('keywords_processed.csv',dtype={"id":"string","keywords":"string"})

#for index,row in df2.iterrows():
#    if pd.isnull(row['keywords'])!=True:
#        x=(row['keywords']).replace("\"","")
#        df2.at[index,'keywords']=x

#df2.to_csv('keywords_processed.csv',index=False,na_rep='N/A')

#df3=pd.read_csv('credits_processed.csv',dtype={"id":"string","crew":"string"},usecols=["id","crew"])
# for index,row in df3.iterrows():
#     x=re.search("'Director', 'name': '[a-z A-Z 0-9]*'",row['crew'])
#     if x is None:
#         df3.at[index,'crew']=None   
#     else:
#         x=x[0]
#         x=x.replace(',','').replace("\"",'').replace('\'','').replace('Director','').replace('name','').replace(':','')
#         x=re.sub(' +',' ',x)
#         df3.at[index,'crew']=x
#         print(x)
# df3.to_csv('credits_processed.csv',index=False,na_rep='N/A')

# x=(df1['genres'].tolist()[0]).replace("\'name\'","").replace("\'id\'","").replace("[","").replace("]","").replace("{","").replace("}","").replace(":","").replace(",","").replace("\'","")
# x=re.sub('[0-9]','',x)
# x=re.sub(' +',' ',x)

# for index,row in df1.iterrows():
#     x=(row['genres']).replace("\'name\'","").replace("\'id\'","").replace("[","").replace("]","").replace("{","").replace("}","").replace(":","").replace(",","").replace("\'","")
#     x=re.sub('[0-9]','',x)
#     x=re.sub(' +',' ',x)
#     df1.at[index,'genres']=x
#     print(x)

# df1.to_csv('movies_metadata_processed.csv',index=False,na_rep='N/A')
# for i in x:
#     print(i)



# (pd.concat([df1, df2, df3], axis=1,join='inner')
#    .to_csv('final.csv', index=False, na_rep='N/A')
# )



        


    