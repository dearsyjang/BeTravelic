















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

# from collections import Counter


# okt = Okt()

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
# keyword_table = "SELECT * FROM survey_keyword"

# follow_data = pd.read_sql_query(follow_table, conn)
# user_data = pd.read_sql_query(user_table, conn)
# place_data = pd.read_sql_query(place_table, conn)
# category_data = pd.read_sql_query(category_table, conn)
# review_data = pd.read_sql_query(review_table, conn)
# keyword_data = pd.read_sql_query(keyword_table, conn)

# user_review_data = pd.merge(user_data, review_data, on='user_id')
# place_category_data = pd.merge(place_data, category_data, on='category_id')
# place_review_data = pd.merge(place_data, review_data, on='place_id')
# user_review_place_data = pd.merge(user_review_data, place_data, on='place_id')
# Place_review_category_data = pd.merge(place_review_data, place_category_data, on='place_id')

# # # keyword_dict = {
# # #                 '전통적인' : '전통적인', '옛날' : '전통적인', '전통미' : '전통적인', '고려' : '전통적인', '조선' : '전통적인', '조상' : '전통적인', '선조' : '전통적인', '역사' : '전통적인',
# # #                 '쇼핑' : '쇼핑', '물건' : '쇼핑', '샀':'쇼핑' ,
# # #                 '자연' : '자연', '풍경' : '자연', '야외' : '자연', 
# # #                 '관광' : '유명한' , '관광지' : '유명한', '유명한' : '유명한' ,
# # #                 '분위기' : '분위기 있는', '운치' : '분위기 있는',  '한적한' : '분위기 있는', '조용하고' : '분위기 있는', 
# # #                 '최신' : '신기한', '신기' : '신기한' , '처음보는' : '신기한', 
# # #                 '깔끔' : '깔끔한' , '깨끗' : '깔끔한',
# # #                 '힐링' : '힐링',
# # #                 '감동적인' : '감동', '감동' : '감동', '감격' : '감동',  
# # #                 '좋' : '좋아요', '너무너무' : '좋아요', '짱짱' : '좋아요', '짱':'좋아요', '좋았음' : '좋아요',
# # #                 '재밌' : '꿀잼','재미있' : '꿀잼', '잼' : '꿀잼', '재미' : '꿀잼', '꿀' : '꿀잼', '흥미':'꿀잼', '놀': '꿀잼', '놀았다' : '꿀잼', '놀았습니다' : '꿀잼', '재미있게' : '꿀잼', 
# # #                 '웃' : '웃음주의', '웃음' : '웃음주의', '웃기': '웃음주의', '코믹' : '웃음주의', '웃긴' : '웃음주의', '웃겨요': '웃음주의', '코미디':'웃음주의', '배꼽':'웃음주의','웃겼':'웃음주의','웃겨서':'웃음주의',
# # #                 '와' : '대박', '진짜' : '대박', '오' : '대박', '대단' : '대박', '강력':'대박', '역시':'대박', 
# # #                 '볼' : '볼만한', '괜찮':'볼만한',
# # #                 '즐겁' : '즐거운', '즐거웠': '즐거운', '신나': '즐거운', '스트레스' : '즐거운', '즐길': '즐거운', '즐기':'즐거운', '즐겁게': '즐거운',
# # #                 '매드니스' : '미친', '매드': '미친', '미쳤':'미친',
# # #                 '유쾌' : '꿀잼',
# # #                 '눈물' : '슬픔', '울' : '슬픔',
# # #                 '신선' : '신선한', '새로운':'신선한','신기':'신선한','다양':'신선한','센스':'신선한',
# # #                 '무섭' : '공포', '무서운' : '공포',
# # #                 '따뜻' : '따뜻한',
# # #                 '빠지' : '몰입', '열연' : '몰입', '공감' : '몰입', '집중' : '몰입', '여운':'몰입',
# # #                 '반전' : '소름',
# # #                 '놀라' : '감탄', '깜짝':'감탄',
# # #                 '탄탄' : '완벽',
# # #                 '매력' : '매력적인',
# # #                 '고요' : '고요한',
# # #                 '기대' : '기대가 되는',
# # #                 '감사' : '만족',
# # #                 '시간' : '시간순삭',
# # #                 '또' : 'N차 방문', '더' : 'N차 방문', '다음': 'N차 방문','다시': 'N차 방문', '자주': 'N차 방문',
# # #                 '추천' : '꿀잼보장',
# # #                 '꼭' : '강추', '완전' : '강추','박수':'강추','지인':'강추',
# # #                 '노래' : '고막 힐링', '매력' : '고막 힐링', '소리': '고막 힐링','목소리':'고막 힐링','음악':'고막 힐링',
# # #                 '기억' : '인상적인', '장면': '인상적인', '추억':'인상적인','인생':'인상적인','열심히':'인상적인','호흡':'인상적인','인상':'인상적인',
# # #                 '어린이' : '아이', '아기' : '아이', 
# # #                 '남편' : '가족', '아들' : '가족', '딸' : '가족', '부모' : '가족', '아빠' : '가족', '엄마' : '가족', '형':'가족',
# # #                 '남친' : '커플', '연인' : '커플', '데이트':'커플', '여친' : '커플',
# # #                 '혼자' : '혼자 갈 만한', 
# # #                 '함께' : '함께 갈 만한', '같이' : '함께 갈 만한',
# # #                 '둘' : '친구'
# # #             }
# # # stop_words = "에서 를 으로는 는 에 화 을 하는 이 습니 곳 . , 랑 수 많은 많음 사람 장소 느낌 느껴지는 있는 있어서 지는 이랑 이런 와 곳 가 인 적 수 곳 너무 에 는데 라도 어서 에서 이 어서 어요 과 는 부터 것 을 어요 고 게 던 은 었 내내 도 고 ㅋ ㅎ 나오 는 님 했 던 보다"
# # # stop_words = set(stop_words.split(' '))

# current_user_id=282

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
    



# #     #앞에서 10명 
# #     lst2 = lst[:10]
# #     #뒤에서 5명
# #     lst3 = lst[-5:]

#     #팔로우한 사람을 제외한 추천 피드 (2순위)
#     rec_feed=[]
#     for i in lst2:
#         if i != current_user_id and i not in following_list:
#             user_index = user_data.index[(user_data['user_id']==i)]
#             user_index2= user_index.values[0]
#             print(user_review_place_data['real_file_name_y'])
#             #print(user_review_place_data['real_file_name_x'])
#             rec_feed.append(tuple([user_review_place_data['place_id'][user_index2],user_review_place_data['user_id'][user_index2],user_review_place_data['review_id'][user_index2],user_review_place_data['contents'][user_index2],user_review_place_data['real_file_name_y'][user_index2],user_review_place_data['real_file_name_y'][user_index2],user_review_place_data['real_file_name_y'][user_index2],user_review_place_data['real_file_name_y'][user_index2],user_review_place_data['nickname'][user_index2],user_review_place_data['created_at'][user_index2],user_review_place_data['visited_at'][user_index2]]))
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
#                 print(user_review_place_data['real_file_name_y'])
#                 #print(user_review_place_data['real_file_name_x'])
#                 follow_feed.append(tuple([user_review_place_data['place_id'][user_index2],user_review_place_data['user_id'][user_index2],user_review_place_data['review_id'][user_index2],user_review_place_data['contents'][user_index2],user_review_place_data['real_file_name_y'][user_index2],user_review_place_data['real_file_name_y'][user_index2],user_review_place_data['real_file_name_y'][user_index2],user_review_place_data['real_file_name_y'][user_index2],user_review_place_data['nickname'][user_index2],user_review_place_data['created_at'][user_index2],user_review_place_data['visited_at'][user_index2]]))
#                 #follow_feed.append(tuple([user_review_place_data['review_id'][user_index2],user_review_place_data['place_id'][user_index2],user_review_place_data['user_id'][user_index2],user_review_place_data['review_id'][user_index2],user_review_place_data['contents'][user_index2],user_review_place_data['file_name_x'][user_index2],user_review_place_data['file_name_y'][user_index2],user_review_place_data['real_file_name_x'][user_index2],user_review_place_data['real_file_name_y'][user_index2],user_review_place_data['nickname'][user_index2],user_review_place_data['created_at'][user_index2],user_review_place_data['visited_at'][user_index2]]))
#     set_follow_feed = set(follow_feed)
#     set_follow_feed2 = list(set_follow_feed)
#     set_follow_feed2_sorted = sorted(set_follow_feed2, reverse= True, key=lambda x: x[9])



    
# #     #모든 유저의 리스트
# #     all_user_list=list(user_data['user_id'])
# #     #현재 사용자 제외
# #     all_user_list.remove(current_user_id)
    


#     random_rec=[]
#     # 팔로우도 없고 리뷰도 없는 유저 (3순위)
#     if current_user_id not in users_list and current_user_id not in list(follow_data['follower_user_id']):
#         for i in all_user_list:
#             user_index = user_review_place_data.index[(user_review_place_data['user_id']==i)]
#             user_index3= user_index.values
#             for user_index2 in user_index3:
#                 print(user_review_place_data['real_file_name_y'])
#                 #print(user_review_place_data['real_file_name_x'])
#                 random_rec.append(tuple([user_review_place_data['place_id'][user_index2],user_review_place_data['user_id'][user_index2],user_review_place_data['review_id'][user_index2],user_review_place_data['contents'][user_index2],user_review_place_data['real_file_name_y'][user_index2],user_review_place_data['real_file_name_y'][user_index2],user_review_place_data['real_file_name_y'][user_index2],user_review_place_data['real_file_name_y'][user_index2],user_review_place_data['nickname'][user_index2],user_review_place_data['created_at'][user_index2],user_review_place_data['visited_at'][user_index2]]))
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
    
# #     #print(user_review_list)
# #     user_review_list2=[]
# #     for re in user_review_list:
# #         value= user_review_list.index(re)
# #         list_re = list(re)
# #         list_re.insert(0,value+1)
# #         user_review_list2.append(tuple(list_re))
    
# #     #print(user_review_list2) 
        
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


# #         #cursor=conn.cursor()
# #         sql="insert into recommendfeed(recommend_user_id,place_id,user_id,review_id,contents,file_name,file_name_user,real_file_name,real_file_name_user,nickname,created_at,visited_at) values(%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s)"
# #         cursor.executemany(sql,user_review_list2)
# #         # conn.commit()
# #         # conn.close()

# #         # #cursor=conn.cursor()
# #         # sql = "truncate recommenduser"
# #         # cursor.execute(sql)

# #         # #cursor=conn.cursor()
# #         # sql="insert into recommenduser(recommend_user_id,image,nickname,user_id) values(%s,%s,%s,%s)"
# #         # cursor.executemany(sql,set_rec_user2)
# #         conn.commit()
# #         conn.close()

#     #mysql_save(user_review_list)
#     mysql_save(user_review_list2)
        
# feed_recommendations(current_user_id)
