# import requests
# from bs4 import BeautifulSoup as bs
# import json
# import pandas as pd
# import pymysql
# url = "https://apis.data.go.kr/B551011/KorService/locationBasedList?numOfRows=500&pageNo=1&MobileOS=ETC&MobileApp=AppTest&serviceKey=Fhj6wYwYTAPqmUqp1muDBvajeKuzLaLOqJ8cF8kOaihooH1zwUx/QxfJHIDNK2Z92OJy1v4aOzdzDUGkankf6Q==&_type=json&listYN=Y&arrange=C&mapX=127.2305&mapY=36.2101&radius=100000"
# #url = "https://apis.data.go.kr/B551011/KorService/locationBasedList?numOfRows=500&pageNo=1&MobileOS=ETC&MobileApp=AppTest&serviceKey=u%2BjV5wk3kfRDNYzjkRRvxna4o90S3cnR3le8jzWGVkrVgM%2B%2BqjF%2FODE8lJEb1dqGLTamXXqLSFFUIHi73hOX%2FA%3D%3D&_type=json&listYN=Y&arrange=C&mapX=128.54&mapY=37.45&radius=100000"
# response= requests.get(url,verify=False)
# res=response.text
# data=json.loads(res)
# # print(data)
# places=data['response']['body']['items']['item']
# info_list=[]
# for place in places:
#     #print(place)
#     if place["firstimage"] and place["contenttypeid"] != '32' and place["contenttypeid"] != '38' and place["contenttypeid"] != '25':
#         place_id = places.index(place)+1417
#         # category_id=place.place_category.filter(place["contenttypeid"]=categories['content_type_id'])
#         category_id = 0
#         region_id=0
#         contenttypeid = place["contenttypeid"]




#         if place["contenttypeid"] == '12':
#             category_id = 1
#         elif place["contenttypeid"] == '14':
#             category_id = 2
#         elif place["contenttypeid"] == '15':
#             category_id = 3
#         elif place["contenttypeid"] == '25':
#             category_id = 7
#         elif place["contenttypeid"] == '28':
#             category_id = 4
#         elif place["contenttypeid"] == '38':
#             category_id = 5
#         elif place["contenttypeid"] == '39':
#             category_id = 6
#         elif place["contenttypeid"] == '32':
#             category_id = 8


#         if place["areacode"]=="1":
#             region_id= 1
#         elif place["areacode"]=="2":
#             region_id= 4
#         elif place["areacode"]=="3":
#             region_id= 6
#         elif place["areacode"]=="4":
#             region_id= 3
#         elif place["areacode"]=="5":
#             region_id= 5
#         elif place["areacode"]=="6":
#             region_id= 2
#         elif place["areacode"]=="7":
#             region_id= 7
#         elif place["areacode"]=="8":
#             region_id= 8
#         elif place["areacode"]=="31":
#             region_id= 9
#         elif place["areacode"]=="32":
#             region_id= 10 
#         elif place["areacode"]=="33":
#             region_id= 11 
#         elif place["areacode"]=="34":
#             region_id= 12 
#         elif place["areacode"]=="35":
#             region_id= 15 
#         elif place["areacode"]=="36":
#             region_id= 16
#         elif place["areacode"]=="37":
#             region_id= 13
#         elif place["areacode"]=="38":
#             region_id= 14 
#         elif place["areacode"]=="39":
#             region_id= 17 

#         addr=place["addr1"]
#         title=place["title"]
#         if place["firstimage"]:
#             image=place["firstimage"]
#         else:
#             image="등록된 사진이 없습니다."
#         mapx=place["mapx"]
#         mapy=place["mapy"]
#         score= 0
#         content_id=place["contentid"]
#         place_overview_url="https://apis.data.go.kr/B551011/KorService/detailCommon?MobileOS=ETC&MobileApp=AppTest&serviceKey=Fhj6wYwYTAPqmUqp1muDBvajeKuzLaLOqJ8cF8kOaihooH1zwUx/QxfJHIDNK2Z92OJy1v4aOzdzDUGkankf6Q==&_type=json&contentId=" + content_id + "&contentTypeId=" + str(contenttypeid) +"&defaultYN=N&firstImageYN=N&areacodeYN=N&catcodeYN=N&addrinfoYN=N&mapinfoYN=N&overviewYN=Y"
#         #place_overview_url="https://apis.data.go.kr/B551011/KorService/detailCommon?serviceKey=Fhj6wYwYTAPqmUqp1muDBvajeKuzLaLOqJ8cF8kOaihooH1zwUx/QxfJHIDNK2Z92OJy1v4aOzdzDUGkankf6Q==&MobileOS=ETC&MobileApp=AppTest&_type=json&contentId=" + content_id + "&contentTypeId=" + str(contenttypeid) +"&defaultYN=Y&firstImageYN=Y&areacodeYN=Y&catcodeYN=Y&addrinfoYN=Y&mapinfoYN=Y&overviewYN=Y"
#         overview_response= requests.get(place_overview_url,verify=False)
#         overview_res = overview_response.text
#         overview_data = json.loads(overview_res)
#         place_overview=overview_data['response']['body']

#         if place_overview['totalCount'] != 0 :
#             overview = place_overview['items']['item'][0]['overview'][:450]+'...'
#             #print(overview)
#             info_list.append(tuple([place_id,category_id,addr,region_id,score,title,image,mapx,mapy,content_id,overview]))
#         else:
#             overview = "장소에 대한 데이터가 없습니다"
#             #print(overview)
#             info_list.append(tuple([place_id,category_id,addr,region_id,score,title,image,mapx,mapy,content_id,overview]))
  
# #print(info_list)


# df=pd.DataFrame(info_list,columns=['place_id','category_id','addr','region_id','score','title','image','mapx','mapy','content_id','overview'])
# #print(df)

# def mysql_save(info_list):
#     conn=pymysql.connect(host='j7d205.p.ssafy.io',
#                         user='root',
#                         password='betravelic205',
#                         db='D205_2',
#                         charset='utf8')
#     cursor=conn.cursor()
#     sql="insert into place(place_id,category_id,addr,region_id,score,title,image,mapx,mapy,content_id,overview) values(%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s)"
#     cursor.executemany(sql,info_list)
#     conn.commit()
#     conn.close()
# mysql_save(info_list)


