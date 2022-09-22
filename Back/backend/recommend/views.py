
from urllib.parse import unquote, urlencode, quote_plus
import requests
import pprint
import json
from django.shortcuts import render, get_list_or_404, get_object_or_404, redirect, resolve_url
import ssl
import urllib.request
from django.http import HttpResponse
from django.shortcuts import render

from .models import PlaceCategory
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import User, Place ,RecommendPlace , RecommendUser
from .serializers.user import UserSerializer
from .serializers.place import PlaceSerializer, PlaceListSerializer
from .serializers.recommendplace import RecommendPlaceSerializer
from .serializers.recommenduser import RecommendUserSerializer

# Create your views here.

from konlpy.tag import Okt
from numpy import dot
from numpy.linalg import norm
import numpy as np
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
from sklearn.decomposition import TruncatedSVD
import pandas as pd
import numpy as np
import pymysql
from eunjeon import Mecab


conn = pymysql.connect(host='localhost',
                        user='root',
                        password='ssafyd205',
                        db='D205_2',
                        charset='utf8')




user_table = "SELECT * FROM user"
place_table = "SELECT * FROM place"
category_table = "SELECT * FROM place_category"
place_keywords_table = "SELECT * FROM place_keywords"
review_table = "SELECT * FROM review"
all_keywords_table = "SELECT * FROM keywords"


user_data = pd.read_sql_query(user_table, conn)
place_data = pd.read_sql_query(place_table, conn)
category_data = pd.read_sql_query(category_table, conn)
keywords_data = pd.read_sql_query(place_keywords_table, conn)
review_data = pd.read_sql_query(review_table, conn)
all_keywords_data = pd.read_sql_query(all_keywords_table, conn)

user_review_data = pd.merge(user_data, review_data, on='user_id')
place_category_data = pd.merge(place_data, category_data, on='category')
place_keywords_data = pd.merge(place_data, keywords_data, on='place_id')
place_review_data = pd.merge(place_data, review_data, on='place_id')
place_keywords_match_data = pd.merge(place_keywords_data, all_keywords_data, on='keywords_id')
user_review_place_data = pd.merge(user_review_data, place_data, on='place_id')
Place_review_category_data = pd.merge(place_review_data, place_category_data, on='place_id')

from numpy import dot
from numpy.linalg import norm
import numpy as np
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
from sklearn.decomposition import TruncatedSVD
import pandas as pd
import numpy as np
import pymysql
from eunjeon import Mecab


conn = pymysql.connect(host='localhost',
                        user='root',
                        password='ssafyd205',
                        db='D205_2',
                        charset='utf8')



follow_table = "SELECT * FROM follow"
user_table = "SELECT * FROM user"
place_table = "SELECT * FROM place"
category_table = "SELECT * FROM place_category"
place_keywords_table = "SELECT * FROM place_keywords"
review_table = "SELECT * FROM review"
all_keywords_table = "SELECT * FROM keywords"

follow_data = pd.read_sql_query(follow_table, conn)
user_data = pd.read_sql_query(user_table, conn)
place_data = pd.read_sql_query(place_table, conn)
category_data = pd.read_sql_query(category_table, conn)
keywords_data = pd.read_sql_query(place_keywords_table, conn)
review_data = pd.read_sql_query(review_table, conn)
all_keywords_data = pd.read_sql_query(all_keywords_table, conn)

user_review_data = pd.merge(user_data, review_data, on='user_id')
place_category_data = pd.merge(place_data, category_data, on='category')
place_keywords_data = pd.merge(place_data, keywords_data, on='place_id')
place_review_data = pd.merge(place_data, review_data, on='place_id')
place_keywords_match_data = pd.merge(place_keywords_data, all_keywords_data, on='keywords_id')
user_review_place_data = pd.merge(user_review_data, place_data, on='place_id')
Place_review_category_data = pd.merge(place_review_data, place_category_data, on='place_id')



@api_view(['GET'])
def get_users(request):
    if request.method=='GET':
        users = get_list_or_404(User)
        serializer = UserSerializer(users,many=True)
        return Response(serializer.data)



@api_view(['GET'])
def get_places(request):
    if request.method=='GET':
        places = get_list_or_404(Place)
        serializer = PlaceListSerializer(places,many=True)
        return Response(serializer.data)


@api_view(['GET'])
def get_recommend_places(request):
    if request.method=='GET':
        places = get_list_or_404(RecommendPlace)
        serializer = RecommendPlaceSerializer(places,many=True)
        return Response(serializer.data)



@api_view(['GET'])
def place_recommend(request):
    #current_user_id= request.get('current_user_id')
    #selected_category = request.get('selected_category')
    current_user_id= 1
    selected_category = '음식점'
    def place_recommendations(current_user_id, selected_category):

        user_keywords=[]
        for i in range(len(Place_review_category_data['contents'])):
            if Place_review_category_data['user_id'][i]== current_user_id and Place_review_category_data['category_name'][i]== selected_category:

                m = Mecab().pos(Place_review_category_data['contents'][i], flatten=True) 
                m_filtered = [x for x, y in m if y in ['NNG','XR']] 
                for j in m_filtered:
                    user_keywords.append(j)

        all_keywords= []
        for i in range(len(Place_review_category_data['contents'])):
            if Place_review_category_data['category_name'][i]== selected_category:
                m = Mecab().pos(Place_review_category_data['contents'][i], flatten=True) 
                m_filtered = [x for x, y in m if y in ['NNG','XR']] 
                for j in m_filtered:
                    all_keywords.append(j)

        lst= [set() for _ in range(len(place_data))]        #중복 제거를 위해 set으로 만들어줌
        k=1
        for i in range(1,len(place_review_data['contents'])):
            if place_review_data['place_id'][i-1]== place_review_data['place_id'][i]:

                m = Mecab().pos(place_review_data['contents'][i], flatten=True) 
                m_filtered = [x for x, y in m if y in ['NNG','XR']] 
                for j in m_filtered:
                    lst[k].add(j)

            else:
                k+=1
                m = Mecab().pos(place_review_data['contents'][i], flatten=True) 
                m_filtered = [x for x, y in m if y in ['NNG','XR']] 
                for j in m_filtered:
                    lst[k].add(j)


        set_user_keywords = set(user_keywords)
        set_all_keywords= set(all_keywords)
        #print(set_all_keywords)



        # 기준이 되는 키워드와 벡터 키워드 리스트를 받아서 키워드별 빈도를 구하는 함수
        def make_matrix(feats, list_data):
            freq_list = []
            for feat in feats:
                freq = 0
                for word in list_data:
                    if feat == word:
                        freq += 1
                freq_list.append(freq)
            return freq_list


        #로그인한 user keyword matrix
        my_matrix = np.array(make_matrix(set_all_keywords, set_user_keywords))


        #선택한 카테고리에 속하는 모든 여행지의 keyword matrix
        v_lst=[]
        for i in range(len(lst)):
            v_lst.append(np.array(make_matrix(set_all_keywords, lst[i])))




        # 코사인 유사도를 구하는 함수
        def cos_sim(a, b):
            return dot(a, b)/(norm(a)*norm(b))



        dic=dict()
        for i in range(len(v_lst)):
            cs = cos_sim(my_matrix, v_lst[i])
            dic[i]=cs

        sorted_dic = sorted(dic.items())

        index_list=[]
        for i in sorted_dic:
            index_list.append(i[0])



        info_list=[]
        for i in index_list:
            for j in range(len(place_data['place_id'])):
                if i == place_data['place_id'][j]:
                    info_list.append(tuple([j,place_data['place_id'][j],place_data['addr'][j],place_data['score'][j],place_data['mapx'][j],place_data['mapy'][j],place_data['title'][j],place_data['image'][j],place_data['overview'][j]]))

        #return info_list
        #print(info_list)
        df=pd.DataFrame(info_list,columns=['recommend_id','place_id','addr','score','mapx','mapy','title','image','overview'])


        def mysql_save(info_list):
            conn=pymysql.connect(host='localhost',
                                user='root',
                                password='ssafyd205',
                                db='D205_2',
                                charset='utf8')

            cursor=conn.cursor()
            sql = "truncate recommendplace"
            cursor.execute(sql)
            

            #cursor=conn.cursor()
            sql="insert into recommendplace(recommend_id,place_id,addr,score,mapx,mapy,title,image,overview) values(%s,%s,%s,%s,%s,%s,%s,%s,%s)"
            cursor.executemany(sql,info_list)
            conn.commit()
            conn.close()
        mysql_save(info_list)


    
    place_recommendations(current_user_id, selected_category)

    if request.method=='GET':
        places = get_list_or_404(RecommendPlace)
        serializer = RecommendPlaceSerializer(places,many=True)
        return Response(serializer.data)



@api_view(['GET'])
def another_recommend(request):
    #selected_place_name= request.get('selected_place_name')
    selected_place_name='양산문화원'
    #overview로 뽑아낸 cosine 유사도 추천(컨텐츠 기반 필터링)


    #overview열에 대해서 TF-IDF 행렬을 구한 후 행렬의 크기를 출력
    tfidf = TfidfVectorizer(stop_words='english')
    tfidf_matrix = tfidf.fit_transform(place_data['overview'])
    #print('TF-IDF 행렬의 크기(shape) :',tfidf_matrix.shape)

    #벡터에 대해서 상호 간의 코사인 유사도를 구함
    cosine_sim = cosine_similarity(tfidf_matrix, tfidf_matrix)
    #print('코사인 유사도 연산 결과 :',cosine_sim.shape)

    #이제 기존 데이터프레임으로부터 여행지의 타이틀을 key, 여행지의 인덱스를 value로 하는 딕셔너리 title_to_index를 만들어준다.
    title_to_index = dict(zip(place_data['title'], place_data.index))




    def another_recommendations(selected_place_name, cosine_sim=cosine_sim):
        # 선택한 여행지의 타이틀로부터 해당 영화의 인덱스를 받아온다.
        idx = title_to_index[selected_place_name]

        # 해당 여행지와 모든 여행지와의 유사도를 가져온다.
        sim_scores = list(enumerate(cosine_sim[idx]))

        # 유사도에 따라 여행지들을 정렬한다.
        sim_scores = sorted(sim_scores, key=lambda x: x[1], reverse=True)

        # 가장 유사한 10개의 여행지를 받아온다.
        sim_scores = sim_scores[1:11]

        # 가장 유사한 10개의 여행지의 인덱스를 얻는다.
        place_indices = [idx[0] for idx in sim_scores]

        info_list=[]
        for i in place_indices:
            for j in range(len(place_data)):
                if i == place_data.index[j]:
                    info_list.append(tuple([j,place_data['place_id'][j],place_data['addr'][j],place_data['score'][j],place_data['mapx'][j],place_data['mapy'][j],place_data['title'][j],place_data['image'][j],place_data['overview'][j]]))
        
        # 가장 유사한 10개의 여행지의 이름을 리턴한다.
        #return list(place_data['title'].iloc[place_indices])
        #print(info_list)
        df=pd.DataFrame(info_list,columns=['recommend_id','place_id','addr','score','mapx','mapy','title','image','overview'])

        def mysql_save(info_list):
            conn=pymysql.connect(host='localhost',
                                user='root',
                                password='ssafyd205',
                                db='D205_2',
                                charset='utf8')
            cursor=conn.cursor()
            sql = "truncate recommendplace"
            cursor.execute(sql)
            

            #cursor=conn.cursor()
            sql="insert into recommendplace(recommend_id,place_id,addr,score,mapx,mapy,title,image,overview) values(%s,%s,%s,%s,%s,%s,%s,%s,%s)"
            cursor.executemany(sql,info_list)
            conn.commit()
            conn.close()
        mysql_save(info_list)



    another_recommendations(selected_place_name)


    if request.method=='GET':
        places = get_list_or_404(RecommendPlace)
        serializer = RecommendPlaceSerializer(places,many=True)
        return Response(serializer.data)



@api_view(['GET'])
def sns_recommend(request):
    #selected_user_id= request.get('selected_user_id')
    selected_user_id= 3 
    def sns_recommendations(selected_user_id):

        

        place_user_score = place_review_data.pivot_table('score_y', index ='title', columns='user_id').fillna(0)
        user_place_score = place_user_score.values.T
        #print(place_user_score)

        SVD = TruncatedSVD(n_components=3)
        matrix=SVD.fit_transform(user_place_score)
        #print(matrix[0])

        corr = np.corrcoef(matrix)
        #print(corr.shape)

    
        users = place_user_score.columns
        users_list = list(users)
        coffey_hands = users_list.index(selected_user_id)
        corr_coffey_hands = corr[coffey_hands]
        lst= list(users[(corr_coffey_hands>=0.9)] )

        user_review_list=[]
        for i in lst:
            if i != selected_user_id:
                user_review_list.append(tuple([i,user_review_place_data['place_id'][i],user_review_place_data['user_id'][i],user_review_place_data['review_id'][i],user_review_place_data['contents'][i],user_review_place_data['image_x'][i],user_review_place_data['image_y'][i],user_review_place_data['nickname'][i]]))


        df=pd.DataFrame(user_review_list,columns=['recommend_user_id','place_id','user_id','review_id','contents','image_x','image_y','nickname'])

        def mysql_save(user_review_list):
            conn=pymysql.connect(host='localhost',
                                user='root',
                                password='ssafyd205',
                                db='D205_2',
                                charset='utf8')
            cursor=conn.cursor()
            sql = "truncate recommenduser"
            cursor.execute(sql)
            

            #cursor=conn.cursor()
            sql="insert into recommenduser(recommend_user_id,place_id,user_id,review_id,contents,image_x,image_y,nickname) values(%s,%s,%s,%s,%s,%s,%s,%s)"
            cursor.executemany(sql,user_review_list)
            conn.commit()
            conn.close()
        mysql_save(user_review_list)

    sns_recommendations(selected_user_id)


    if request.method=='GET':
        users = get_list_or_404(RecommendUser)
        serializer = RecommendUserSerializer(users,many=True)
        return Response(serializer.data)
