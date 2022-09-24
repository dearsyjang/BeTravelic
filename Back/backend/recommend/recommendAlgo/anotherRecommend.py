# from konlpy.tag import Okt
# from numpy import dot
# from numpy.linalg import norm
# import numpy as np

# from sklearn.decomposition import TruncatedSVD
# import pandas as pd
# import numpy as np
# import pymysql


# from sklearn.feature_extraction.text import TfidfVectorizer
# from sklearn.metrics.pairwise import cosine_similarity


# conn = pymysql.connect(host='localhost',
#                         user='root',
#                         password='ssafyd205',
#                         db='D205_2',
#                         charset='utf8')



# place_table = "SELECT * FROM place"
# category_table = "SELECT * FROM place_category"
# place_keywords_table = "SELECT * FROM place_keywords"
# review_table = "SELECT * FROM review"
# all_keywords_table = "SELECT * FROM keywords"

# place_data = pd.read_sql_query(place_table, conn)
# category_data = pd.read_sql_query(category_table, conn)
# keywords_data = pd.read_sql_query(place_keywords_table, conn)
# review_data = pd.read_sql_query(review_table, conn)
# all_keywords_data = pd.read_sql_query(all_keywords_table, conn)


# place_category_data = pd.merge(place_data, category_data, on='category')
# place_keywords_data = pd.merge(place_data, keywords_data, on='place_id')
# place_review_data = pd.merge(place_data, review_data, on='place_id')
# place_keywords_match_data = pd.merge(place_keywords_data, all_keywords_data, on='keywords_id')





# #overview로 뽑아낸 cosine 유사도 추천(컨텐츠 기반 필터링)


# #overview열에 대해서 TF-IDF 행렬을 구한 후 행렬의 크기를 출력
# tfidf = TfidfVectorizer(stop_words='english')
# tfidf_matrix = tfidf.fit_transform(place_data['overview'])
# #print('TF-IDF 행렬의 크기(shape) :',tfidf_matrix.shape)

# #벡터에 대해서 상호 간의 코사인 유사도를 구함
# cosine_sim = cosine_similarity(tfidf_matrix, tfidf_matrix)
# #print('코사인 유사도 연산 결과 :',cosine_sim.shape)

# #이제 기존 데이터프레임으로부터 여행지의 타이틀을 key, 여행지의 인덱스를 value로 하는 딕셔너리 title_to_index를 만들어준다.
# title_to_index = dict(zip(place_data['title'], place_data.index))




# def another_recommendations(selected_place_name, cosine_sim=cosine_sim):
#     # 선택한 여행지의 타이틀로부터 해당 영화의 인덱스를 받아온다.
#     idx = title_to_index[selected_place_name]

#     # 해당 여행지와 모든 여행지와의 유사도를 가져온다.
#     sim_scores = list(enumerate(cosine_sim[idx]))

#     # 유사도에 따라 여행지들을 정렬한다.
#     sim_scores = sorted(sim_scores, key=lambda x: x[1], reverse=True)

#     # 가장 유사한 10개의 여행지를 받아온다.
#     sim_scores = sim_scores[1:11]

#     # 가장 유사한 10개의 여행지의 인덱스를 얻는다.
#     place_indices = [idx[0] for idx in sim_scores]

#     info_list=[]
#     for i in place_indices:
#         for j in range(len(place_data)):
#             if i == place_data.index[j]:
#                 info_list.append(tuple([j,place_data['place_id'][j],place_data['addr'][j],place_data['score'][j],place_data['mapx'][j],place_data['mapy'][j],place_data['title'][j],place_data['image'][j],place_data['overview'][j]]))
    
#     # 가장 유사한 10개의 여행지의 이름을 리턴한다.
#     #return list(place_data['title'].iloc[place_indices])

#     df=pd.DataFrame(info_list,columns=['recommend_id','place_id','addr','score','mapx','mapy','title','image','overview'])

#     def mysql_save(info_list):
#         conn=pymysql.connect(host='localhost',
#                             user='root',
#                             password='ssafyd205',
#                             db='D205_2',
#                             charset='utf8')
#         cursor=conn.cursor()
#         sql = "truncate recommendplace"
#         cursor.execute(sql)
        

#         #cursor=conn.cursor()
#         sql="insert into recommendplace(recommend_id,place_id,addr,score,mapx,mapy,title,image,overview) values(%s,%s,%s,%s,%s,%s,%s,%s,%s)"
#         cursor.executemany(sql,info_list)
#         conn.commit()
#         conn.close()
#     mysql_save(info_list)


# selected_place_name='양산문화원'
# another_recommendations(selected_place_name)



