# from konlpy.tag import Okt
# from numpy import dot
# from numpy.linalg import norm
# import numpy as np
# from sklearn.feature_extraction.text import TfidfVectorizer
# from sklearn.metrics.pairwise import cosine_similarity
# from sklearn.decomposition import TruncatedSVD
# import pandas as pd
# import numpy as np
# import pymysql
# # from eunjeon import Mecab
# from konlpy.tag import Okt

# conn = pymysql.connect(host='j7d205.p.ssafy.io',
#                         user='root',
#                         password='d205',
#                         db='D205_2',
#                         charset='utf8')



# follow_table = "SELECT * FROM follow"
# user_table = "SELECT * FROM user"
# place_table = "SELECT * FROM place"
# category_table = "SELECT * FROM categories"
# review_table = "SELECT * FROM review"


# follow_data = pd.read_sql_query(follow_table, conn)
# user_data = pd.read_sql_query(user_table, conn)
# place_data = pd.read_sql_query(place_table, conn)
# category_data = pd.read_sql_query(category_table, conn)
# review_data = pd.read_sql_query(review_table, conn)

# user_review_data = pd.merge(user_data, review_data, on='user_id')
# place_category_data = pd.merge(place_data, category_data, on='category_id')
# place_review_data = pd.merge(place_data, review_data, on='place_id')
# user_review_place_data = pd.merge(user_review_data, place_data, on='place_id')
# Place_review_category_data = pd.merge(place_review_data, place_category_data, on='place_id')


# #print(Place_review_category_data)

# #print(review_data)
# # print(place_category_data['category_name'])
# # print(place_keywords_match_data['name'])
# # print(place_keywords_data['keywords_id'])
# # print(place_review_data['contents'])
# #print(place_category_data)

# #print(place_keywords_data)
# #print(place_keywords_match_data)
# #print(place_review_data)
# #########################################################################################################

# #review로 뽑아낸 cosine 유사도 추천

# okt = Okt()



# def place_recommendations(current_user_id, selected_category):
    
#     user_keywords=[]
#     for i in range(len(Place_review_category_data['contents'])):
#         if Place_review_category_data['user_id'][i]== current_user_id and Place_review_category_data['category_name'][i]== selected_category:

#             # m = Mecab().pos(Place_review_category_data['contents'][i], flatten=True) 
#             # m_filtered = [x for x, y in m if y in ['NNG','XR']] 
#             m_filtered= okt.nouns(Place_review_category_data['contents'][i])

#             for j in m_filtered:
#                 user_keywords.append(j)

#     all_keywords= []
#     for i in range(len(Place_review_category_data['contents'])):
#         if Place_review_category_data['category_name'][i]== selected_category:

#             # m = Mecab().pos(Place_review_category_data['contents'][i], flatten=True) 
#             # m_filtered = [x for x, y in m if y in ['NNG','XR']] 
#             m_filtered= okt.nouns(Place_review_category_data['contents'][i])
#             for j in m_filtered:
#                 all_keywords.append(j)

#     lst= [set() for _ in range(len(place_data))]        #중복 제거를 위해 set으로 만들어줌
#     k=1
#     for i in range(1,len(place_review_data['contents'])):
#         if place_review_data['place_id'][i-1]== place_review_data['place_id'][i]:

#             # m = Mecab().pos(place_review_data['contents'][i], flatten=True) 
#             # m_filtered = [x for x, y in m if y in ['NNG','XR']] 
#             m_filtered= okt.nouns(Place_review_category_data['contents'][i])
#             for j in m_filtered:
#                 lst[k].add(j)

#         else:
#             k+=1
#             # m = Mecab().pos(place_review_data['contents'][i], flatten=True) 
#             # m_filtered = [x for x, y in m if y in ['NNG','XR']] 
#             m_filtered= okt.nouns(Place_review_category_data['contents'][i])
#             for j in m_filtered:
#                 lst[k].add(j)

    
#     set_user_keywords = set(user_keywords)
#     set_all_keywords= set(all_keywords)
#     print(set_all_keywords)



#     # 기준이 되는 키워드와 벡터 키워드 리스트를 받아서 키워드별 빈도를 구하는 함수
#     def make_matrix(feats, list_data):
#         freq_list = []
#         for feat in feats:
#             freq = 0
#             for word in list_data:
#                 if feat == word:
#                     freq += 1
#             freq_list.append(freq)
#         return freq_list


#     #로그인한 user keyword matrix
#     my_matrix = np.array(make_matrix(set_all_keywords, set_user_keywords))


#     #선택한 카테고리에 속하는 모든 여행지의 keyword matrix
#     v_lst=[]
#     for i in range(len(lst)):
#         v_lst.append(np.array(make_matrix(set_all_keywords, lst[i])))




#     # 코사인 유사도를 구하는 함수
#     def cos_sim(a, b):
#         return dot(a, b)/(norm(a)*norm(b))



#     dic=dict()
#     for i in range(len(v_lst)):
#         cs = cos_sim(my_matrix, v_lst[i])
#         dic[i]=cs

#     sorted_dic = sorted(dic.items())

#     index_list=[]
#     for i in sorted_dic:
#         index_list.append(i[0])



#     info_list=[]
#     for i in index_list:
#         for j in range(len(place_data['place_id'])):
#             if i == place_data['place_id'][j]:
#                 info_list.append(tuple([j,place_data['place_id'][j],place_data['addr'][j],place_data['score'][j],place_data['mapx'][j],place_data['mapy'][j],place_data['title'][j],place_data['image'][j],place_data['overview'][j]]))

#     #return info_list
#     #print(info_list)
#     df=pd.DataFrame(info_list,columns=['recommend_id','place_id','addr','score','mapx','mapy','title','image','overview'])


#     def mysql_save(info_list):
#         conn=pymysql.connect(host='j7d205.p.ssafy.io',
#                         user='root',
#                         password='d205',
#                         db='D205_2',
#                         charset='utf8')
#         cursor=conn.cursor()
#         sql = "truncate recommendplace"
#         cursor.execute(sql)
        

#         #cursor=conn.cursor()
#         sql="insert into recommendplace(recommend_id,place_id,addr,score,mapx,mapy,title,image,overview) values(%s,%s,%s,%s,%s,%s,%s,%s,%s)"
#         cursor.executemany(sql,info_list)
#         conn.commit()
#         conn.close()
#     mysql_save(info_list)



# current_user_id = 1         
# selected_category= "관광지"   
# print(place_recommendations(current_user_id, selected_category))


# ##############################################################################################


# # from konlpy.tag import Okt
# # from numpy import dot
# # from numpy.linalg import norm
# # import numpy as np
# # from sklearn.feature_extraction.text import TfidfVectorizer
# # from sklearn.metrics.pairwise import cosine_similarity
# # from sklearn.decomposition import TruncatedSVD
# # import pandas as pd
# # import numpy as np
# # import pymysql
# # from eunjeon import Mecab


# # conn = pymysql.connect(host='localhost',
# #                         user='root',
# #                         password='ssafyd205',
# #                         db='D205_2',
# #                         charset='utf8')





# # place_table = "SELECT * FROM place"
# # category_table = "SELECT * FROM place_category"
# # place_keywords_table = "SELECT * FROM place_keywords"
# # review_table = "SELECT * FROM review"
# # all_keywords_table = "SELECT * FROM keywords"

# # place_data = pd.read_sql_query(place_table, conn)
# # category_data = pd.read_sql_query(category_table, conn)
# # keywords_data = pd.read_sql_query(place_keywords_table, conn)
# # review_data = pd.read_sql_query(review_table, conn)
# # all_keywords_data = pd.read_sql_query(all_keywords_table, conn)



# # place_category_data = pd.merge(place_data, category_data, on='category')
# # place_keywords_data = pd.merge(place_data, keywords_data, on='place_id')
# # place_review_data = pd.merge(place_data, review_data, on='place_id')
# # place_keywords_match_data = pd.merge(place_keywords_data, all_keywords_data, on='keywords_id')




# # #print(review_data)
# # # print(place_category_data['category_name'])
# # # print(place_keywords_match_data['name'])
# # # print(place_keywords_data['keywords_id'])
# # # print(place_review_data['contents'])
# # #print(place_category_data)

# # #print(place_keywords_data)
# # #print(place_keywords_match_data)
# # #print(place_review_data)
# # #########################################################################################################

# # #review로 뽑아낸 cosine 유사도 추천






# # okt = Okt()

# # # 방문지 별로 모든 리뷰 정보를 가져온다. 
# # lst= [set() for _ in range(len(place_data))]        #중복 제거를 위해 set으로 만들어줌

# # k=1
# # for i in range(1,len(place_review_data['contents'])):
# #     if place_review_data['place_id'][i-1]== place_review_data['place_id'][i]:

# #         m = Mecab().pos(place_review_data['contents'][i], flatten=True) 
# #         m_filtered = [x for x, y in m if y in ['NNG','XR']] 
# #         for j in m_filtered:
# #             lst[k].add(j)
# #         # for j in okt.nouns(place_review_data['contents'][i]):
# #         #     lst[k].add(j)
# #     else:
# #         k+=1
# #         m = Mecab().pos(place_review_data['contents'][i], flatten=True) 
# #         m_filtered = [x for x, y in m if y in ['NNG','XR']] 
# #         for j in m_filtered:
# #             lst[k].add(j)
# #         # for j in okt.nouns(place_review_data['contents'][i]):
# #         #     lst[k].add(j)

# # print(place_review_data)
# # print(lst)
# # #set_lst= set(lst)
# # #print(set_lst)
# # selected_place_id = 1   #프론트에서 넘겨주는 place_id
# # selected_list=lst[selected_place_id]



# # # 기준이 되는 키워드와 벡터 키워드 리스트를 받아서 키워드별 빈도를 구하는 함수
# # def make_matrix(feats, list_data):
# #     freq_list = []
# #     for feat in feats:
# #         freq = 0
# #         for word in list_data:
# #             if feat == word:
# #                 freq += 1
# #         freq_list.append(freq)
# #     return freq_list


# # v_lst=[]
# # for i in range(len(lst)):
# #     #print(lst[i])
# #     v_lst.append(np.array(make_matrix(selected_list, lst[i])))

# # #print(v_lst)


# # # sentence = '이 여행지는 여자친구와 함께 와서 즐길 수 있는 최적의 여행지이다. 매우 즐거운 시간을 보낼 수 있었다. 적이었다 힐링 할 수 있었다. 볼거리 휴식 체험 생동감 짜릿함 가성비 인상적이었다 이국적인 곳 ' 

# # # m1 = Mecab().pos(sentence, flatten=True) 
# # # m_filtered1 = [x for x, y in m1 if y in ['NNG','VV','VA','VA+ETM','VV+ETM' ]] 
# # # print(m1)




# # # 코사인 유사도를 구하는 함수
# # def cos_sim(a, b):
# #     return dot(a, b)/(norm(a)*norm(b))


# # k= selected_place_id # 프론트로부터 받은 place_id
# # dic=dict()
# # for i in range(len(v_lst)-2):
# #     if (i+1)!=k:
# #         cs = cos_sim(v_lst[k],v_lst[i+1])
# #         #print(f'{k}<=>{i+1} : {cs}')
# #         dic[i+1]=cs
# # #print(dic)
# # sorted_dic = sorted(dic.items())
# # #print(sorted_dic)
# # index_list=[]
# # for i in sorted_dic:
# #     index_list.append(i[0])
# # #print(index_list)    
# # #print(place_data['place_id'])

# # cosine_place_list=[]
# # for i in index_list:
# #     for j in range(len(place_data['place_id'])):
# #         if i == place_data['place_id'][j]:
# #             cosine_place_list.append(place_data['title'][j])
# # print(cosine_place_list)

