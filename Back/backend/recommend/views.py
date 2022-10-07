
from urllib.parse import unquote, urlencode, quote_plus
import requests
import pprint
import json
from django.shortcuts import render, get_list_or_404, get_object_or_404, redirect, resolve_url
import ssl
import urllib.request
from django.http import HttpResponse
from django.shortcuts import render

from .models import Categories
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import User, Place ,RecommendPlace , RecommendUser, RecommendFeed, Review
from .serializers.review import ReviewListSerializer
from .serializers.user import UserSerializer
from .serializers.place import PlaceSerializer, PlaceListSerializer
from .serializers.recommendplace import RecommendPlaceSerializer
from .serializers.recommenduser import RecommendUserSerializer, RecommendFeedSerializer

# Create your views here.


from numpy import dot
from numpy.linalg import norm
import numpy as np
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
from sklearn.decomposition import TruncatedSVD
import pandas as pd
import numpy as np
import pymysql
# from eunjeon import Mecab
from konlpy.tag import Okt
from collections import Counter

conn = pymysql.connect(host='j7d205.p.ssafy.io',
                        user='root',
                        password='betravelic205',
                        db='D205_2',
                        charset='utf8')



follow_table = "SELECT * FROM follow"
user_table = "SELECT * FROM user"
place_table = "SELECT * FROM place"
category_table = "SELECT * FROM categories"
review_table = "SELECT * FROM review"
keyword_table = "SELECT * FROM survey_keyword"

follow_data = pd.read_sql_query(follow_table, conn)
user_data = pd.read_sql_query(user_table, conn)
place_data = pd.read_sql_query(place_table, conn)
category_data = pd.read_sql_query(category_table, conn)
review_data = pd.read_sql_query(review_table, conn)
keyword_data = pd.read_sql_query(keyword_table, conn)

user_review_data = pd.merge(user_data, review_data, on='user_id')
place_category_data = pd.merge(place_data, category_data, on='category_id')
place_review_data = pd.merge(place_data, review_data, on='place_id')
user_review_place_data = pd.merge(user_review_data, place_data, on='place_id')
Place_review_category_data = pd.merge(place_review_data, place_category_data, on='place_id')



okt = Okt()




# @api_view(['GET'])
# def get_users(request):
#     if request.method=='GET':
#         users = get_list_or_404(User)
#         serializer = UserSerializer(users,many=True)
#         return Response(serializer.data)



@api_view(['GET'])
def get_reviews(request,user_id):
    current_user_id = user_id
    if request.method=='GET':
        reviews = get_list_or_404(Review)
        serializer = ReviewListSerializer(reviews,many=True)
        count = [0]*18
        
        for data in serializer.data:
            if data['user_id']==current_user_id:
                if data['region_id']==1:
                    count[1]+=1
                elif data['region_id']==2:
                    count[2]+=1
                elif data['region_id']==3:
                    count[3]+=1
                elif data['region_id']==4:
                    count[4]+=1
                elif data['region_id']==5:
                    count[5]+=1
                elif data['region_id']==6:
                    count[6]+=1
                elif data['region_id']==7:
                    count[7]+=1
                elif data['region_id']==8:
                    count[8]+=1
                elif data['region_id']==9:
                    count[9]+=1
                elif data['region_id']==10:
                    count[10]+=1
                elif data['region_id']==11:
                    count[11]+=1
                elif data['region_id']==12:
                    count[12]+=1
                elif data['region_id']==13:
                    count[13]+=1
                elif data['region_id']==14:
                    count[14]+=1
                elif data['region_id']==15:
                    count[15]+=1
                elif data['region_id']==16:
                    count[16]+=1
                elif data['region_id']==17:
                    count[17]+=1
        max_list = []
        no1= max(count)
        max_list.append(count.index(no1))
        count.remove(no1)
        no2= max(count)
        max_list.append(count.index(no2))
        count.remove(no2)
        no3= max(count)
        max_list.append(count.index(no3))
        count.remove(no3)
        
        result = []
        for m in max_list:
            if m==1:
                result.append('서울특별시')
            elif m==2:
                result.append('부산광역시')
            elif m==3:
                result.append('대구광역시')
            elif m==4:
                result.append('인천광역시')
            elif m==5:
                result.append('대전광역시')
            elif m==6:
                result.append('대전광역시')
            elif m==7:
                result.append('울산광역시')
            elif m==8:
                result.append('세종특별시')
            elif m==9:
                result.append('경기도')
            elif m==10:
                result.append('강원도')
            elif m==11:
                result.append('충청북도')
            elif m==12:
                result.append('충청남도')
            elif m==13:
                result.append('전라북도')
            elif m==14:
                result.append('전라남도')
            elif m==15:
                result.append('경상북도')
            elif m==16:
                result.append('경상남도')
            elif m==17:
                result.append('제주도')
        return Response(result)


# @api_view(['GET'])
# def get_recommend_places(request):
#     if request.method=='GET':
#         places = get_list_or_404(RecommendPlace)
#         serializer = RecommendPlaceSerializer(places,many=True)
#         return Response(serializer.data)



@api_view(['GET'])
def place_recommend(request,user_id,category):

    current_user_id = user_id
    selected_category = category
    # current_user_id= request.query_params.get('current_user_id')
    # selected_category = request.query_params.get('selected_category')
    #current_user_id= 1
    #selected_category = '음식점'
    keyword_dict = {
                '전통적인' : '전통적인', '옛날' : '전통적인', '전통미' : '전통적인', '고려' : '전통적인', '조선' : '전통적인', '조상' : '전통적인', '선조' : '전통적인', '역사' : '전통적인',
                '쇼핑' : '쇼핑', '물건' : '쇼핑', '샀':'쇼핑' ,
                '자연' : '자연', '풍경' : '자연', '야외' : '자연', 
                '관광' : '유명한' , '관광지' : '유명한', '유명한' : '유명한' ,
                '분위기' : '분위기 있는', '운치' : '분위기 있는',  '한적한' : '분위기 있는', '조용하고' : '분위기 있는', 
                '최신' : '신기한', '신기' : '신기한' , '처음보는' : '신기한', 
                '깔끔' : '깔끔한' , '깨끗' : '깔끔한',
                '힐링' : '힐링',
                '감동적인' : '감동', '감동' : '감동', '감격' : '감동',  
                '좋' : '좋아요', '너무너무' : '좋아요', '짱짱' : '좋아요', '짱':'좋아요', '좋았음' : '좋아요',
                '재밌' : '꿀잼','재미있' : '꿀잼', '잼' : '꿀잼', '재미' : '꿀잼', '꿀' : '꿀잼', '흥미':'꿀잼', '놀': '꿀잼', '놀았다' : '꿀잼', '놀았습니다' : '꿀잼', '재미있게' : '꿀잼', 
                '웃' : '웃음주의', '웃음' : '웃음주의', '웃기': '웃음주의', '코믹' : '웃음주의', '웃긴' : '웃음주의', '웃겨요': '웃음주의', '코미디':'웃음주의', '배꼽':'웃음주의','웃겼':'웃음주의','웃겨서':'웃음주의',
                '와' : '대박', '진짜' : '대박', '오' : '대박', '대단' : '대박', '강력':'대박', '역시':'대박', 
                '볼' : '볼만한', '괜찮':'볼만한',
                '즐겁' : '즐거운', '즐거웠': '즐거운', '신나': '즐거운', '스트레스' : '즐거운', '즐길': '즐거운', '즐기':'즐거운', '즐겁게': '즐거운',
                '매드니스' : '미친', '매드': '미친', '미쳤':'미친',
                '유쾌' : '꿀잼',
                '눈물' : '슬픔', '울' : '슬픔',
                '신선' : '신선한', '새로운':'신선한','신기':'신선한','다양':'신선한','센스':'신선한',
                '무섭' : '공포', '무서운' : '공포',
                '따뜻' : '따뜻한',
                '빠지' : '몰입', '열연' : '몰입', '공감' : '몰입', '집중' : '몰입', '여운':'몰입',
                '반전' : '소름',
                '놀라' : '감탄', '깜짝':'감탄',
                '탄탄' : '완벽',
                '매력' : '매력적인',
                '고요' : '고요한',
                '기대' : '기대가 되는',
                '감사' : '만족',
                '시간' : '시간순삭',
                '또' : 'N차 방문', '더' : 'N차 방문', '다음': 'N차 방문','다시': 'N차 방문', '자주': 'N차 방문',
                '추천' : '꿀잼보장',
                '꼭' : '강추', '완전' : '강추','박수':'강추','지인':'강추',
                '노래' : '고막 힐링', '매력' : '고막 힐링', '소리': '고막 힐링','목소리':'고막 힐링','음악':'고막 힐링',
                '기억' : '인상적인', '장면': '인상적인', '추억':'인상적인','인생':'인상적인','열심히':'인상적인','호흡':'인상적인','인상':'인상적인',
                '어린이' : '아이', '아기' : '아이', 
                '남편' : '가족', '아들' : '가족', '딸' : '가족', '부모' : '가족', '아빠' : '가족', '엄마' : '가족', '형':'가족',
                '남친' : '커플', '연인' : '커플', '데이트':'커플', '여친' : '커플',
                '혼자' : '혼자 갈 만한', 
                '함께' : '함께 갈 만한', '같이' : '함께 갈 만한',
                '둘' : '친구'
            }
    stop_words = "에서 를 으로는 는 에 화 을 하는 이 습니 곳 . , 랑 수 많은 많음 사람 장소 느낌 느껴지는 있는 있어서 지는 이랑 이런 와 곳 가 인 적 수 곳 너무 에 는데 라도 어서 에서 이 어서 어요 과 는 부터 것 을 어요 고 게 던 은 었 내내 도 고 ㅋ ㅎ 나오 는 님 했 던 보다"
    stop_words = set(stop_words.split(' '))

    def mysql_delete():
        conn=pymysql.connect(host='j7d205.p.ssafy.io',
                    user='root',
                    password='betravelic205',
                    db='D205_2',
                    charset='utf8')
        cursor=conn.cursor()
        sql = "truncate table recommendplace"
        cursor.execute(sql)
        conn.commit()
        conn.close()
    mysql_delete()

    def place_recommendations(current_user_id, selected_category):

        

        # 현재 유저의 리뷰에서 키워드를 추출
        user_keywords_all=[]
        for i in range(len(Place_review_category_data['contents'])):
            if Place_review_category_data['user_id'][i]== current_user_id and Place_review_category_data['category_name'][i]== selected_category:

                user_review= Place_review_category_data['contents'][i]
                word_tokens = okt.morphs(user_review)
                result = [word for word in word_tokens if not word in stop_words]
                for word in result:
                    user_keywords_all += [keyword_dict[word] if keyword_dict.get(word) else '']



        #키워드 카운트
        user_keywords_count = Counter(user_keywords_all)
        #빈도 높은 5개의 키워드 추출
        user_keywords_most = list(user_keywords_count.most_common(5))
        # 키워드 빈도가 3 이상인 키워드 추출
        user_keywords_selected = list(filter(lambda x : x[1] >= 3, user_keywords_most))

        user_keywords=[]
        for s in user_keywords_selected:
            user_keywords.append(s[0])
        
        # 리뷰가 없는 유저들 설문조사 기반 keyword 추출
        for i in range(len(keyword_data)):
            if keyword_data['user_id'][i]== current_user_id:
                user_keywords.append(keyword_data['survey_keyword'][i])


        # 해당 카테고리에 속하는 place의 모든 키워드 추출
        all_keywords= []
        for i in range(len(Place_review_category_data['contents'])):
            if Place_review_category_data['category_name'][i]== selected_category:
                
                place_review= Place_review_category_data['contents'][i]
                word_tokens = okt.morphs(place_review)
                result = [word for word in word_tokens if not word in stop_words]
                
                for word in result:
                    all_keywords += [keyword_dict[word] if keyword_dict.get(word) else '']
        
        #키워드 카운트
        all_keywords_count = Counter(all_keywords)
        #빈도 높은 20개의 키워드 추출
        all_keywords_most = list(all_keywords_count.most_common(20))
        # 키워드 빈도가 3 이상인 키워드 추출
        all_keywords_selected = list(filter(lambda x : x[1] >= 3, all_keywords_most))

        all_place_keywords=[]
        for s in all_keywords_selected:
            all_place_keywords.append(s[0])


        # place 마다 키워드 추출
        lst= [set() for _ in range(len(place_data))]        #중복 제거를 위해 set으로 만들어줌
        k=1
        for i in range(1,len(place_review_data['contents'])):
            if place_review_data['place_id'][i-1]== place_review_data['place_id'][i]:

                place_review= place_review_data['contents'][i]
                word_tokens = okt.morphs(place_review)
                result = [word for word in word_tokens if not word in stop_words]
                for word in result:
                    lst[k].add(keyword_dict[word] if keyword_dict.get(word) else '')

            
            else:
                k+=1
                place_review= place_review_data['contents'][i]
                word_tokens = okt.morphs(place_review)
                result = [word for word in word_tokens if not word in stop_words]
                for word in result:
                    lst[k].add(keyword_dict[word] if keyword_dict.get(word) else '')
                


        set_user_keywords = set(user_keywords)
        set_all_keywords= set(all_place_keywords)

        


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


        #place_id 와 코사인 유사도를 딕셔너리 형태로 저장
        dic=dict()
        for i in range(len(v_lst)):
            cs = cos_sim(my_matrix, v_lst[i])
            dic[i]=cs


        #코사인 유사도 높은 순서대로 정렬
        sorted_dic = sorted(dic.items(), reverse = True, key = lambda item: item[1])
        #print(sorted_dic)

        #인덱스 추출
        index_list=[]
        for i in sorted_dic:
            index_list.append(i[0])
        #상위 30개만
        index_list_30 = index_list[:1000]
        #print(place_data)
        #코사인 유사도 높은 순서대로
        info_list=[]
        print(index_list_30)
        for i in range(len(index_list_30)):
            for j in range(len(place_data['place_id'])):
                if index_list_30[i] == j:
                    s_category_name=''
                    if place_data['category_id'][j]==1:
                        s_category_name="관광지"
                    elif place_data['category_id'][j]==2:
                        s_category_name="박물관"
                    elif place_data['category_id'][j]==3:
                        s_category_name="축제"
                    elif place_data['category_id'][j]==4:
                        s_category_name="레저스포츠"
                    elif place_data['category_id'][j]==5:
                        s_category_name="쇼핑"
                    elif place_data['category_id'][j]==6:
                        s_category_name="음식점"
                    if s_category_name==selected_category:
                        info_list.append(tuple([i,place_data['place_id'][j],place_data['addr'][j],place_data['score'][j],place_data['mapx'][j],place_data['mapy'][j],place_data['title'][j],place_data['image'][j],place_data['overview'][j]]))

        #return info_list
        df=pd.DataFrame(info_list,columns=['recommend_id','place_id','addr','score','mapx','mapy','title','image','overview'])
        print(df)

        def mysql_save(info_list):
            conn=pymysql.connect(host='j7d205.p.ssafy.io',
                        user='root',
                        password='betravelic205',
                        db='D205_2',
                        charset='utf8')

            cursor=conn.cursor()
        
            

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
def another_recommend(request,place_name):
    selected_place_name = place_name
    #selected_place_name= request.query_params.get('selected_place_name')
    # selected_place_name='양산문화원'
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


    def mysql_delete():
        conn=pymysql.connect(host='j7d205.p.ssafy.io',
                    user='root',
                    password='betravelic205',
                    db='D205_2',
                    charset='utf8')
        cursor=conn.cursor()
        sql = "truncate table recommendplace"
        cursor.execute(sql)
        conn.commit()
        conn.close()
    mysql_delete()


    def another_recommendations(selected_place_name, cosine_sim=cosine_sim):

        

        # 선택한 여행지의 타이틀로부터 해당 여행지의 인덱스를 받아온다.
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
        for i in range(len(place_indices)):
            for j in range(len(place_data)):
                if place_indices[i] == place_data.index[j]:
                    info_list.append(tuple([i+1,place_data['place_id'][j],place_data['addr'][j],place_data['score'][j],place_data['mapx'][j],place_data['mapy'][j],place_data['title'][j],place_data['image'][j],place_data['overview'][j]]))
    
        # 가장 유사한 10개의 여행지의 이름을 리턴한다.
        #return list(place_data['title'].iloc[place_indices])
        #print(info_list)
        df=pd.DataFrame(info_list,columns=['recommend_id','place_id','addr','score','mapx','mapy','title','image','overview'])

        def mysql_save(info_list):
            conn=pymysql.connect(host='j7d205.p.ssafy.io',
                        user='root',
                        password='betravelic205',
                        db='D205_2',
                        charset='utf8')
            cursor=conn.cursor()
        
            

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
def feed_recommend(request, user_id):
    current_user_id = user_id
    # current_user_id= request.query_params.get('current_user_id')
    #request.data('current_user_id')
    # current_user_id= 3 
    def mysql_delete():
        conn=pymysql.connect(host='j7d205.p.ssafy.io',
                    user='root',
                    password='betravelic205',
                    db='D205_2',
                    charset='utf8')
        cursor=conn.cursor()
        sql = "truncate table recommendfeed"
        cursor.execute(sql)
        conn.commit()
        conn.close()

    mysql_delete()

    def feed_recommendations(current_user_id):

    
        


        #최종 리스트
        user_review_list=[]

        #팔로우 리스트
        following_list=[]
        for i in range(len(follow_data)):
            if follow_data['follower_user_id'][i]==current_user_id:
                following_list.append(follow_data['following_user_id'][i])


        #리뷰 점수를 기준으로 비슷한 유저 찾아냄 
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


        lst=[]
        if current_user_id in users_list:
            coffey_hands = users_list.index(current_user_id)
            corr_coffey_hands = corr[coffey_hands]
            lst= list(users[(corr_coffey_hands>=0.5)] )
            lst.remove(current_user_id)
        



        #앞에서 10명 
        lst2 = lst[:10]
        #뒤에서 5명
        lst3 = lst[-5:]

        #팔로우한 사람을 제외한 추천 피드 (2순위)
        rec_feed=[]
        for i in lst2:
            if i != current_user_id and i not in following_list:
                user_index = user_data.index[(user_data['user_id']==i)]
                user_index2= user_index.values[0]
            
                rec_feed.append(tuple([user_review_place_data['place_id'][user_index2],user_review_place_data['user_id'][user_index2],user_review_place_data['review_id'][user_index2],user_review_place_data['contents'][user_index2],user_review_place_data['real_file_name_y'][user_index2],user_review_place_data['real_file_name_y'][user_index2],user_review_place_data['real_file_name_y'][user_index2],user_review_place_data['real_file_name_y'][user_index2],user_review_place_data['nickname'][user_index2],user_review_place_data['created_at'][user_index2],user_review_place_data['visited_at'][user_index2]]))
                #rec_feed.append(tuple([user_review_place_data['review_id'][user_index2],user_review_place_data['place_id'][user_index2],user_review_place_data['user_id'][user_index2],user_review_place_data['review_id'][user_index2],user_review_place_data['contents'][user_index2],user_review_place_data['file_name_x'][user_index2],user_review_place_data['file_name_y'][user_index2],user_review_place_data['real_file_name_x'][user_index2],user_review_place_data['real_file_name_y'][user_index2],user_review_place_data['nickname'][user_index2],user_review_place_data['created_at'][user_index2],user_review_place_data['visited_at'][user_index2]]))
        set_rec_feed = set(rec_feed)
        set_rec_feed2 = list(set_rec_feed)
        set_rec_feed2_sorted = sorted(set_rec_feed2, reverse= True, key=lambda x: x[9])


        
        

        #팔로우한 유저 피드 (1순위로 나옴)
        follow_feed=[]
        for i in following_list:
            for j in range(len(user_review_place_data)):
                if i== user_review_place_data['user_id'][j]:
                    user_index = user_data.index[(user_data['user_id']==i)]
                    user_index2= user_index.values[0]
               
                    follow_feed.append(tuple([user_review_place_data['place_id'][user_index2],user_review_place_data['user_id'][user_index2],user_review_place_data['review_id'][user_index2],user_review_place_data['contents'][user_index2],user_review_place_data['real_file_name_y'][user_index2],user_review_place_data['real_file_name_y'][user_index2],user_review_place_data['real_file_name_y'][user_index2],user_review_place_data['real_file_name_y'][user_index2],user_review_place_data['nickname'][user_index2],user_review_place_data['created_at'][user_index2],user_review_place_data['visited_at'][user_index2]]))
                    #follow_feed.append(tuple([user_review_place_data['review_id'][user_index2],user_review_place_data['place_id'][user_index2],user_review_place_data['user_id'][user_index2],user_review_place_data['review_id'][user_index2],user_review_place_data['contents'][user_index2],user_review_place_data['file_name_x'][user_index2],user_review_place_data['file_name_y'][user_index2],user_review_place_data['real_file_name_x'][user_index2],user_review_place_data['real_file_name_y'][user_index2],user_review_place_data['nickname'][user_index2],user_review_place_data['created_at'][user_index2],user_review_place_data['visited_at'][user_index2]]))
        set_follow_feed = set(follow_feed)
        set_follow_feed2 = list(set_follow_feed)
        set_follow_feed2_sorted = sorted(set_follow_feed2, reverse= True, key=lambda x: x[9])



        
        #모든 유저의 리스트
        all_user_list=list(user_data['user_id'])
        #현재 사용자 제외
        all_user_list.remove(current_user_id)
        


        random_rec=[]
        # 팔로우도 없고 리뷰도 없는 유저 (3순위)
        if current_user_id not in users_list and current_user_id not in list(follow_data['follower_user_id']):
            for i in all_user_list:
                user_index = user_review_place_data.index[(user_review_place_data['user_id']==i)]
                user_index3= user_index.values
                for user_index2 in user_index3:
                 
                    random_rec.append(tuple([user_review_place_data['place_id'][user_index2],user_review_place_data['user_id'][user_index2],user_review_place_data['review_id'][user_index2],user_review_place_data['contents'][user_index2],user_review_place_data['real_file_name_y'][user_index2],user_review_place_data['real_file_name_y'][user_index2],user_review_place_data['real_file_name_y'][user_index2],user_review_place_data['real_file_name_y'][user_index2],user_review_place_data['nickname'][user_index2],user_review_place_data['created_at'][user_index2],user_review_place_data['visited_at'][user_index2]]))
                    # random_rec.append(tuple([user_review_place_data['review_id'][user_index2],user_review_place_data['place_id'][user_index2],user_review_place_data['user_id'][user_index2],user_review_place_data['review_id'][user_index2],user_review_place_data['contents'][user_index2],user_review_place_data['file_name_x'][user_index2],user_review_place_data['file_name_y'][user_index2],user_review_place_data['real_file_name_x'][user_index2],user_review_place_data['real_file_name_y'][user_index2],user_review_place_data['nickname'][user_index2],user_review_place_data['created_at'][user_index2],user_review_place_data['visited_at'][user_index2]]))
        #print(random_rec)
        random_rec2 = set(random_rec)
        random_rec3 = list(random_rec2)
        random_rec3_sorted = sorted(random_rec3,  reverse= True, key=lambda x: x[9])


        # #1순위
        # print(set_follow_feed2_sorted)
        # #2순위
        # print(set_rec_feed2_sorted)
        # #3순위
        print(random_rec3_sorted)

        user_review_list = set_rec_feed2_sorted + set_follow_feed2_sorted + random_rec3_sorted
        
        #print(user_review_list)
        user_review_list2=[]
        for re in user_review_list:
            value= user_review_list.index(re)
            list_re = list(re)
            list_re.insert(0,value+1)
            user_review_list2.append(tuple(list_re))
        
        #print(user_review_list2) 
            
        df=pd.DataFrame(user_review_list2,columns=['recommend_user_id','place_id','user_id','review_id','contents','file_name','file_name_user','real_file_name','real_file_name_user','nickname','created_at','visited_at'])

        

        def mysql_save(user_review_list2):
            conn=pymysql.connect(host='j7d205.p.ssafy.io',
                        user='root',
                        password='betravelic205',
                        db='D205_2',
                        charset='utf8')
            cursor=conn.cursor()
            sql = "truncate table recommendfeed"
            cursor.execute(sql)


            #cursor=conn.cursor()
            sql="insert into recommendfeed(recommend_user_id,place_id,user_id,review_id,contents,file_name,file_name_user,real_file_name,real_file_name_user,nickname,created_at,visited_at) values(%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s)"
            cursor.executemany(sql,user_review_list2)
            # conn.commit()
            # conn.close()

            # #cursor=conn.cursor()
            # sql = "truncate recommenduser"
            # cursor.execute(sql)

            # #cursor=conn.cursor()
            # sql="insert into recommenduser(recommend_user_id,image,nickname,user_id) values(%s,%s,%s,%s)"
            # cursor.executemany(sql,set_rec_user2)
            conn.commit()
            conn.close()

        #mysql_save(user_review_list)
        mysql_save(user_review_list2)
        
    feed_recommendations(current_user_id)


    if request.method=='GET':
        feeds = get_list_or_404(RecommendFeed)
        serializer = RecommendFeedSerializer(feeds,many=True)
        return Response(serializer.data)


@api_view(['GET'])
def user_recommend(request, user_id):
    current_user_id = user_id
    # current_user_id= request.query_params.get('current_user_id')
    #request.data('current_user_id')
    # current_user_id= 3 
    def mysql_delete():
        conn=pymysql.connect(host='j7d205.p.ssafy.io',
                    user='root',
                    password='betravelic205',
                    db='D205_2',
                    charset='utf8')
        cursor=conn.cursor()
        sql = "truncate table recommenduser"
        cursor.execute(sql)
        conn.commit()
        conn.close()
    mysql_delete()

    def user_recommendations(current_user_id):

        
        

        place_user_score = place_review_data.pivot_table('score_y', index ='title', columns='user_id').fillna(0)
        user_place_score = place_user_score.values.T
        #print(place_user_score)

        SVD = TruncatedSVD(n_components=5)
        matrix=SVD.fit_transform(user_place_score)
        #print(matrix[0])

        corr = np.corrcoef(matrix)
        #print(corr.shape)


        users = place_user_score.columns
        users_list = list(users)
        lst=[]

        # 작성한 리뷰를 바탕으로 비슷한 유저 찾음
        if current_user_id in users_list:
            coffey_hands = users_list.index(current_user_id)
            corr_coffey_hands = corr[coffey_hands]
            lst= list(users[(corr_coffey_hands>=0.5)] )
            lst.remove(current_user_id)

        # 현재 유저의 리뷰가 없거나 비슷한 유저가 없을때 
        if current_user_id not in users_list or len(lst)==0:
            #모든 유저의 리스트
            lst+=list(user_data['user_id'])
            #현재 사용자 제외
            lst.remove(current_user_id)
            


        user_review_list=[]
        following_list=[]
        for i in range(len(follow_data)):
            if follow_data['follower_user_id'][i]==current_user_id:
                following_list.append(follow_data['following_user_id'][i])


        #앞에서 10명
        lst2 = lst[:10]
        #뒤에서 5명
        lst3 = lst[-5:]

        # rec_feed=[]
        # for i in lst2:
        #     if i != current_user_id and i not in following_list:
        #         rec_feed.append(tuple([user_review_place_data['review_id'][i],user_review_place_data['place_id'][i],user_review_place_data['user_id'][i],user_review_place_data['review_id'][i],user_review_place_data['contents'][i],user_review_place_data['image_y'][i],user_review_place_data['image_x'][i],user_review_place_data['nickname'][i],user_review_place_data['created_at'][i],user_review_place_data['visited_at'][i]]))
        # set_rec_feed = set(rec_feed)
        # set_rec_feed2 = list(set_rec_feed)
        # print(set_rec_feed2)
        # user_review_list = set_follow_feed2 + set_rec_feed2
        # print(user_review_list)
        # df=pd.DataFrame(user_review_list,columns=['recommend_feed_id','place_id','user_id','review_id','contents','image_y','image_x','nickname','created_at','visited_at'])

        rec_user=[]
        for i in lst3:
            if i != current_user_id and i not in following_list:
                user_index = user_data.index[(user_data['user_id']==i)]
                user_index2= user_index.values[0]
            
                rec_user.append(tuple([user_index2,user_data['file_name'][user_index2],user_data['real_file_name'][user_index2],user_data['nickname'][user_index2],user_data['user_id'][user_index2]]))

        set_rec_user = set(rec_user)
        set_rec_user2 = list(set_rec_user)
        
        df=pd.DataFrame(set_rec_user2,columns=['recommend_user_id','file_name','real_file_name','nickname','user_id'])


        

        def mysql_save(set_rec_user2):
            conn=pymysql.connect(host='j7d205.p.ssafy.io',
                        user='root',
                        password='betravelic205',
                        db='D205_2',
                        charset='utf8')
            cursor=conn.cursor()
            # sql = "truncate recommendfeed"
            # cursor.execute(sql)


            # #cursor=conn.cursor()
            # sql="insert into recommendfeed(recommend_feed_id,place_id,user_id,review_id,contents,image_y,image_x,nickname,created_at,visited_at) values(%s,%s,%s,%s,%s,%s,%s,%s,%s,%s)"
            # cursor.executemany(sql,user_review_list)
            # conn.commit()
            # conn.close()

            #cursor=conn.cursor()


            #cursor=conn.cursor()
            sql="insert into recommenduser(recommend_user_id,file_name,real_file_name,nickname,user_id) values(%s,%s,%s,%s,%s)"
            cursor.executemany(sql,set_rec_user2)
            conn.commit()
            conn.close()

        #mysql_save(user_review_list)
        mysql_save(set_rec_user2)
    
    user_recommendations(current_user_id)


    if request.method=='GET':
        users = get_list_or_404(RecommendUser)
        serializer = RecommendUserSerializer(users,many=True)
        return Response(serializer.data)