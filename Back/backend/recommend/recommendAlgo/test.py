# from konlpy.tag import Okt
# from numpy import dot
# from numpy.linalg import norm
# import numpy as np

# from sklearn.decomposition import TruncatedSVD
# import pandas as pd
# import numpy as np
# import pymysql

# import matplotlib.pyplot as plt
# import seaborn as sns



# conn = pymysql.connect(host='j7d205.p.ssafy.io',
#                         user='root',
#                         password='betravelic205',
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


# current_user_id=40

# def feed_recommendations(current_user_id):

    
        


#     #최종 리스트
#     user_review_list=[]

#     #팔로우 리스트
#     following_list=[]
#     for i in range(len(follow_data)):
#         if follow_data['follower_user_id'][i]==current_user_id:
#             following_list.append(follow_data['following_user_id'][i])


#     #리뷰 점수를 기준으로 비슷한 유저 찾아냄 
#     place_user_score = place_review_data.pivot_table('score_y', index ='title', columns='user_id').fillna(0)
#     user_place_score = place_user_score.values.T
#     #print(place_user_score)

#     SVD = TruncatedSVD(n_components=3)
#     matrix=SVD.fit_transform(user_place_score)
#     #print(matrix[0])

#     corr = np.corrcoef(matrix)
#     #print(corr.shape)


#     users = place_user_score.columns
#     users_list = list(users)


#     lst=[]
#     if current_user_id in users_list:
#         coffey_hands = users_list.index(current_user_id)
#         corr_coffey_hands = corr[coffey_hands]
#         lst= list(users[(corr_coffey_hands>=0.5)] )
#         lst.remove(current_user_id)
    



#     #앞에서 10명 
#     lst2 = lst[:10]
#     #뒤에서 5명
#     lst3 = lst[-5:]

#     #팔로우한 사람을 제외한 추천 피드 (2순위)
#     rec_feed=[]
#     for i in lst2:
#         if i != current_user_id and i not in following_list:
#             user_index = user_data.index[(user_data['user_id']==i)]
#             user_index2= user_index.values[0]
#             rec_feed.append(tuple([user_review_place_data['place_id'][user_index2],user_review_place_data['user_id'][user_index2],user_review_place_data['review_id'][user_index2],user_review_place_data['contents'][user_index2],user_review_place_data['file_name_x'][user_index2],user_review_place_data['file_name_y'][user_index2],user_review_place_data['real_file_name_x'][user_index2],user_review_place_data['real_file_name_y'][user_index2],user_review_place_data['nickname'][user_index2],user_review_place_data['created_at'][user_index2],user_review_place_data['visited_at'][user_index2]]))
#             #rec_feed.append(tuple([user_review_place_data['review_id'][user_index2],user_review_place_data['place_id'][user_index2],user_review_place_data['user_id'][user_index2],user_review_place_data['review_id'][user_index2],user_review_place_data['contents'][user_index2],user_review_place_data['file_name_x'][user_index2],user_review_place_data['file_name_y'][user_index2],user_review_place_data['real_file_name_x'][user_index2],user_review_place_data['real_file_name_y'][user_index2],user_review_place_data['nickname'][user_index2],user_review_place_data['created_at'][user_index2],user_review_place_data['visited_at'][user_index2]]))
#     set_rec_feed = set(rec_feed)
#     set_rec_feed2 = list(set_rec_feed)
#     set_rec_feed2_sorted = sorted(set_rec_feed2, reverse= True, key=lambda x: x[9])


    
    

#     #팔로우한 유저 피드 (1순위로 나옴)
#     follow_feed=[]
#     for i in following_list:
#         for j in range(len(user_review_place_data)):
#             if i== user_review_place_data['user_id'][j]:
#                 user_index = user_data.index[(user_data['user_id']==i)]
#                 user_index2= user_index.values[0]
#                 follow_feed.append(tuple([user_review_place_data['place_id'][user_index2],user_review_place_data['user_id'][user_index2],user_review_place_data['review_id'][user_index2],user_review_place_data['contents'][user_index2],user_review_place_data['file_name_x'][user_index2],user_review_place_data['file_name_y'][user_index2],user_review_place_data['real_file_name_x'][user_index2],user_review_place_data['real_file_name_y'][user_index2],user_review_place_data['nickname'][user_index2],user_review_place_data['created_at'][user_index2],user_review_place_data['visited_at'][user_index2]]))
#                 #follow_feed.append(tuple([user_review_place_data['review_id'][user_index2],user_review_place_data['place_id'][user_index2],user_review_place_data['user_id'][user_index2],user_review_place_data['review_id'][user_index2],user_review_place_data['contents'][user_index2],user_review_place_data['file_name_x'][user_index2],user_review_place_data['file_name_y'][user_index2],user_review_place_data['real_file_name_x'][user_index2],user_review_place_data['real_file_name_y'][user_index2],user_review_place_data['nickname'][user_index2],user_review_place_data['created_at'][user_index2],user_review_place_data['visited_at'][user_index2]]))
#     set_follow_feed = set(follow_feed)
#     set_follow_feed2 = list(set_follow_feed)
#     set_follow_feed2_sorted = sorted(set_follow_feed2, reverse= True, key=lambda x: x[9])



    
#     #모든 유저의 리스트
#     all_user_list=list(user_data['user_id'])
#     #현재 사용자 제외
#     all_user_list.remove(current_user_id)
    


#     random_rec=[]
#     # 팔로우도 없고 리뷰도 없는 유저 (3순위)
#     if current_user_id not in users_list and current_user_id not in list(follow_data['follower_user_id']):
#         for i in all_user_list:
#             user_index = user_review_place_data.index[(user_review_place_data['user_id']==i)]
#             user_index3= user_index.values
#             for user_index2 in user_index3:
#                 random_rec.append(tuple([user_review_place_data['place_id'][user_index2],user_review_place_data['user_id'][user_index2],user_review_place_data['review_id'][user_index2],user_review_place_data['contents'][user_index2],user_review_place_data['file_name_x'][user_index2],user_review_place_data['file_name_y'][user_index2],user_review_place_data['real_file_name_x'][user_index2],user_review_place_data['real_file_name_y'][user_index2],user_review_place_data['nickname'][user_index2],user_review_place_data['created_at'][user_index2],user_review_place_data['visited_at'][user_index2]]))
#                 # random_rec.append(tuple([user_review_place_data['review_id'][user_index2],user_review_place_data['place_id'][user_index2],user_review_place_data['user_id'][user_index2],user_review_place_data['review_id'][user_index2],user_review_place_data['contents'][user_index2],user_review_place_data['file_name_x'][user_index2],user_review_place_data['file_name_y'][user_index2],user_review_place_data['real_file_name_x'][user_index2],user_review_place_data['real_file_name_y'][user_index2],user_review_place_data['nickname'][user_index2],user_review_place_data['created_at'][user_index2],user_review_place_data['visited_at'][user_index2]]))
#     #print(random_rec)
#     random_rec2 = set(random_rec)
#     random_rec3 = list(random_rec2)
#     random_rec3_sorted = sorted(random_rec3,  reverse= True, key=lambda x: x[9])


#     # #1순위
#     # print(set_follow_feed2_sorted)
#     # #2순위
#     # print(set_rec_feed2_sorted)
#     # #3순위
#     print(random_rec3_sorted)

#     user_review_list = set_rec_feed2_sorted + set_follow_feed2_sorted + random_rec3_sorted
#     #print(user_review_list)
#     user_review_list2=[]
#     for re in user_review_list:
#         value= user_review_list.index(re)
#         list_re = list(re)
#         list_re.insert(0,value+1)
#         user_review_list2.append(tuple(list_re))
    
#     #print(user_review_list2) 
        
#     df=pd.DataFrame(user_review_list2,columns=['recommend_user_id','place_id','user_id','review_id','contents','file_name','file_name_user','real_file_name','real_file_name_user','nickname','created_at','visited_at'])

    

#     def mysql_save(user_review_list2):
#         conn=pymysql.connect(host='j7d205.p.ssafy.io',
#                     user='root',
#                     password='betravelic205',
#                     db='D205_2',
#                     charset='utf8')
#         cursor=conn.cursor()
#         sql = "truncate table recommendfeed"
#         cursor.execute(sql)


#         #cursor=conn.cursor()
#         sql="insert into recommendfeed(recommend_user_id,place_id,user_id,review_id,contents,file_name,file_name_user,real_file_name,real_file_name_user,nickname,created_at,visited_at) values(%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s)"
#         cursor.executemany(sql,user_review_list2)
#         # conn.commit()
#         # conn.close()

#         # #cursor=conn.cursor()
#         # sql = "truncate recommenduser"
#         # cursor.execute(sql)

#         # #cursor=conn.cursor()
#         # sql="insert into recommenduser(recommend_user_id,image,nickname,user_id) values(%s,%s,%s,%s)"
#         # cursor.executemany(sql,set_rec_user2)
#         conn.commit()
#         conn.close()

#     #mysql_save(user_review_list)
#     mysql_save(user_review_list2)
    
# feed_recommendations(current_user_id)