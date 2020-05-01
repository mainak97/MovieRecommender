import pandas as pd
import numpy as np
from sklearn.feature_extraction.text import CountVectorizer
from sklearn.metrics.pairwise import cosine_similarity
import os


df=pd.read_csv('Tags.csv')
cv=CountVectorizer()
count_matrix=cv.fit_transform(df['tags'])

chunk_size = 500 
matrix_len = count_matrix.shape[0]

def similarity_cosine_by_chunk(start, end):
    if end > matrix_len:
        end = matrix_len
    return cosine_similarity(X=count_matrix[start:end], Y=count_matrix)

f=open('trained.txt','w+')
for chunk_start in range(0, matrix_len, chunk_size):
    cosine_similarity_chunk = similarity_cosine_by_chunk(chunk_start, chunk_start+chunk_size)
    #np.savetxt('trained0.txt',cosine_similarity_chunk,delimiter=',')
    for i in range(0,chunk_size):
        similar_movies =list(enumerate(cosine_similarity_chunk[i]))
        sorted_t=sorted(similar_movies,key=lambda x:x[1],reverse=True)
        for j in range(1,31):
            f.write(str(sorted_t[j][0])+','+str(sorted_t[j][1])+' ')
        f.write('\n')
f.close()
#     np.savetxt('trained0.txt',cosine_similarity_chunk,delimiter=',')
#     if chunk_start>0:
#         break

# co=np.loadtxt(open('trained0.txt',"rb"),delimiter=',',skiprows=0)


# sorted_t=sorted(similar_movies,key=lambda x:x[1],reverse=True)

# np.savetxt('t.txt',sorted_t[:30],delimiter=',')

# sorted_t=np.loadtxt(open('t.txt',"rb"),delimiter=',',skiprows=0)

# print(sorted_t)

# with open("trained0") as myfile:
#     head = [next(myfile) for x in range(1)]
# print(head)
