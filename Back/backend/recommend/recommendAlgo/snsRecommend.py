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



# current_user_id= 32


    

# def feed_recommendations(current_user_id):



# def user_recommendations(current_user_id):

    

#         place_user_score = place_review_data.pivot_table('score_y', index ='title', columns='user_id').fillna(0)
#         user_place_score = place_user_score.values.T
#         #print(place_user_score)


#     users = place_user_score.columns
#     users_list = list(users)
#     coffey_hands = users_list.index(current_user_id)
#     corr_coffey_hands = corr[coffey_hands]
#     lst= list(users[(corr_coffey_hands>=0.1)] )



    
#     user_review_list=[]
#     following_list=[]
#     for i in range(len(follow_data)):
#         if follow_data['follower_user_id'][i]==current_user_id:
#             following_list.append(follow_data['following_user_id'][i])

#     follow_feed=[]
#     for i in following_list:
#         for j in range(len(user_review_place_data)):
#             if i== user_review_place_data['user_id'][j]:
#                 user_index = user_data.index[(user_data['user_id']==i)]
#                 user_index2= user_index.values[0]
#                 follow_feed.append(tuple([user_review_place_data['review_id'][user_index2],user_review_place_data['place_id'][user_index2],user_review_place_data['user_id'][user_index2],user_review_place_data['review_id'][user_index2],user_review_place_data['contents'][user_index2],user_review_place_data['file_name_x'][user_index2],user_review_place_data['file_name_y'][user_index2],user_review_place_data['real_file_name_x'][user_index2],user_review_place_data['real_file_name_y'][user_index2],user_review_place_data['nickname'][user_index2],user_review_place_data['created_at'][user_index2],user_review_place_data['visited_at'][user_index2]]))
#     set_follow_feed = set(follow_feed)
#     set_follow_feed2 = list(set_follow_feed)
#     #print(set_follow_feed2)
#     lst2 = lst[:-5]
    
#     lst3 = lst[-5:]

#     rec_feed=[]
#     for i in lst2:
#         if i != current_user_id and i not in following_list:
#             user_index = user_data.index[(user_data['user_id']==i)]
#             user_index2= user_index.values[0]
#             rec_feed.append(tuple([user_review_place_data['review_id'][user_index2],user_review_place_data['place_id'][user_index2],user_review_place_data['user_id'][user_index2],user_review_place_data['review_id'][user_index2],user_review_place_data['contents'][user_index2],user_review_place_data['file_name_x'][user_index2],user_review_place_data['file_name_y'][user_index2],user_review_place_data['real_file_name_x'][user_index2],user_review_place_data['real_file_name_y'][user_index2],user_review_place_data['nickname'][user_index2],user_review_place_data['created_at'][user_index2],user_review_place_data['visited_at'][user_index2]]))
#     set_rec_feed = set(rec_feed)
#     set_rec_feed2 = list(set_rec_feed)

#     user_review_list = set_follow_feed2 + set_rec_feed2
#     # print(user_review_list)
#     df=pd.DataFrame(user_review_list,columns=['recommend_user_id','place_id','user_id','review_id','contents','file_name','file_name_user','real_file_name','real_file_name_user','nickname','created_at','visited_at'])
#     #print(df)
    
#     # rec_user=[]
#     # for i in lst3:
#     #     if i != current_user_id and i not in following_list:
#     #         rec_user.append(tuple([user_data['user_id'][i],user_data['image'][i],user_data['nickname'][i],user_data['user_id'][i]]))
#     # set_rec_user = set(rec_user)
#     # set_rec_user2 = list(set_rec_user)


#         def mysql_save(set_rec_user2):
#             conn=pymysql.connect(host='j7d205.p.ssafy.io',
#                         user='root',
#                         password='betravelic205',
#                         db='D205_2',
#                         charset='utf8')
#             cursor=conn.cursor()
#             # sql = "truncate recommendfeed"
#             # cursor.execute(sql)

#     def mysql_save(user_review_list):
#         conn=pymysql.connect(host='j7d205.p.ssafy.io',
#                     user='root',
#                     password='betravelic205',
#                     db='D205_2',
#                     charset='utf8')
#         cursor=conn.cursor()
#         sql = "truncate table recommendfeed"
#         cursor.execute(sql)

#             # #cursor=conn.cursor()
#             # sql="insert into recommendfeed(recommend_feed_id,place_id,user_id,review_id,contents,image_y,image_x,nickname,created_at,visited_at) values(%s,%s,%s,%s,%s,%s,%s,%s,%s,%s)"
#             # cursor.executemany(sql,user_review_list)
#             # conn.commit()
#             # conn.close()

#         #cursor=conn.cursor()
#         sql="insert into recommendfeed(recommend_user_id,place_id,user_id,review_id,contents,file_name,file_name_user,real_file_name,real_file_name_user,nickname,created_at,visited_at) values(%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s)"
#         cursor.executemany(sql,user_review_list)
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
#     mysql_save(user_review_list)



# print(feed_recommendations(current_user_id))


# # ################################################################################################

# # # from konlpy.tag import Okt
# # # from numpy import dot
# # # from numpy.linalg import norm
# # # import numpy as np

# # # from sklearn.decomposition import TruncatedSVD
# # # import pandas as pd
# # # import numpy as np
# # # import pymysql



# # # conn = pymysql.connect(host='localhost',
# # #                         user='root',
# # #                         password='ssafyd205',
# # #                         db='D205_2',
# # #                         charset='utf8')





# # # place_table = "SELECT * FROM place"
# # # category_table = "SELECT * FROM place_category"
# # # place_keywords_table = "SELECT * FROM place_keywords"
# # # review_table = "SELECT * FROM review"
# # # all_keywords_table = "SELECT * FROM keywords"

# # # place_data = pd.read_sql_query(place_table, conn)
# # # category_data = pd.read_sql_query(category_table, conn)
# # # keywords_data = pd.read_sql_query(place_keywords_table, conn)
# # # review_data = pd.read_sql_query(review_table, conn)
# # # all_keywords_data = pd.read_sql_query(all_keywords_table, conn)


# # # place_category_data = pd.merge(place_data, category_data, on='category')
# # # place_keywords_data = pd.merge(place_data, keywords_data, on='place_id')
# # # place_review_data = pd.merge(place_data, review_data, on='place_id')
# # # place_keywords_match_data = pd.merge(place_keywords_data, all_keywords_data, on='keywords_id')


# # # def place_recommendations(selected_place_name):

# # #     user_place_score = place_review_data.pivot_table('score_y', index = 'user_id', columns='title').fillna(0)
# # #     place_user_score = user_place_score.values.T
# # #     #print(place_user_score)

# # #     SVD = TruncatedSVD(n_components=3)
# # #     matrix=SVD.fit_transform(place_user_score)
# # #     #print(matrix[0])

# # #     corr = np.corrcoef(matrix)
# # #     #print(corr.shape)

   
# # #     place_title = user_place_score.columns
# # #     place_title_list = list(place_title)
# # #     coffey_hands = place_title_list.index(selected_place_name)
# # #     corr_coffey_hands = corr[coffey_hands]
# # #     return list(place_title[(corr_coffey_hands>=0.9)])


# # # selected_place_name='양산문화원'
# # # print(sns_recommendations(selected_place_name))



