import requests
from bs4 import BeautifulSoup as bs
import json
import pandas as pd
import pymysql
url = "https://apis.data.go.kr/B551011/KorService/locationBasedList?numOfRows=10&pageNo=1&MobileOS=ETC&MobileApp=AppTest&serviceKey=Fhj6wYwYTAPqmUqp1muDBvajeKuzLaLOqJ8cF8kOaihooH1zwUx/QxfJHIDNK2Z92OJy1v4aOzdzDUGkankf6Q==&_type=json&listYN=Y&arrange=C&mapX=128.6922646449&mapY=35.9910080699&radius=100000"
response= requests.get(url,verify=False)
res=response.text
data=json.loads(res)
places=data['response']['body']['items']['item']
info_list=[]
for place in places:
    place_id = places.index(place)+1
    # category=place.place_category.filter(place["contenttypeid"]=categories['content_type_id'])
    category = 0
    contenttypeid = place["contenttypeid"]
    if place["contenttypeid"] == '12':
        category = 1
    elif place["contenttypeid"] == '14':
        category = 2
    elif place["contenttypeid"] == '15':
        category = 3
    elif place["contenttypeid"] == '25':
        category = 7
    elif place["contenttypeid"] == '28':
        category = 4
    elif place["contenttypeid"] == '38':
        category = 5
    elif place["contenttypeid"] == '39':
        category = 6
    elif place["contenttypeid"] == '32':
        category = 8

    if place["addr1"][0:5]=="서울특별시":
        region= 1
    elif place["addr1"][0:5]=="인천광역시":
        region= 2
    elif place["addr1"][0:5]=="대전광역시":
        region= 3
    elif place["addr1"][0:5]=="대구광역시":
        region= 4
    elif place["addr1"][0:5]=="광주광역시":
        region= 5
    elif place["addr1"][0:5]=="부산광역시":
        region= 6
    elif place["addr1"][0:5]=="울산광역시":
        region= 7
    elif place["addr1"][0:5]=="세종특별시":
        region= 8
    elif place["addr1"][0:3]=="경기도":
        region= 9
    elif place["addr1"][0:3]=="강원도":
        region= 10 
    elif place["addr1"][0:4]=="충청북도":
        region= 11 
    elif place["addr1"][0:4]=="충청남도":
        region= 12 
    elif place["addr1"][0:4]=="경상북도":
        region= 13 
    elif place["addr1"][0:4]=="경상남도":
        region= 14 
    elif place["addr1"][0:4]=="전라북도":
        region= 15 
    elif place["addr1"][0:4]=="전라남도":
        region= 16 
    elif place["addr1"][0:3]=="제주도":
        region= 17 
   

    addr=place["addr1"]
    title=place["title"]
    if place["firstimage"]:
        image=place["firstimage"]
    else:
        image="등록된 사진이 없습니다."
    mapx=place["mapx"]
    mapy=place["mapy"]
    score= 0
    content_id=place["contentid"]
    place_overview_url="https://apis.data.go.kr/B551011/KorService/detailCommon?MobileOS=ETC&MobileApp=AppTest&serviceKey=Fhj6wYwYTAPqmUqp1muDBvajeKuzLaLOqJ8cF8kOaihooH1zwUx/QxfJHIDNK2Z92OJy1v4aOzdzDUGkankf6Q==&_type=json&contentId=" + content_id + "&contentTypeId=" + str(contenttypeid) +"&defaultYN=N&firstImageYN=N&areacodeYN=N&catcodeYN=N&addrinfoYN=N&mapinfoYN=N&overviewYN=Y"
    overview_response= requests.get(place_overview_url,verify=False)
    overview_res = overview_response.text
    overview_data = json.loads(overview_res)
    place_overview=overview_data['response']['body']
    #print(place_overview)
    if place_overview['totalCount'] != 0 :
        overview = place_overview['items']['item'][0]['overview'][:450]+'...'
        #print(overview)
        info_list.append(tuple([place_id,category,addr,region,score,title,image,mapx,mapy,content_id,overview]))
    else:
        overview = "장소에 대한 데이터가 없습니다"
        #print(overview)
        info_list.append(tuple([place_id,category,addr,region,score,title,image,mapx,mapy,content_id,overview]))
  
#print(info_list)


df=pd.DataFrame(info_list,columns=['place_id','category','addr','region','score','title','image','mapx','mapy','content_id','overview'])
#print(df)

def mysql_save(info_list):
    conn=pymysql.connect(host='localhost',
                        user='root',
                        password='ssafyd205',
                        db='D205_2',
                        charset='utf8')
    cursor=conn.cursor()
    sql="insert into place(place_id,category,addr,region,score,title,image,mapx,mapy,content_id,overview) values(%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s)"
    cursor.executemany(sql,info_list)
    conn.commit()
    conn.close()
mysql_save(info_list)



# serviceUrl = 'https://apis.data.go.kr/B551011/KorService/locationBasedList'

# numOfRows = '30' # 한 페이지 결과 수
# pageNo = '1' # 페이지 번호
# MobileOS = 'ETC' # OS 구분
# MobileApp = 'AppTest' # 서비스명
# MyserviceKey="Fhj6wYwYTAPqmUqp1muDBvajeKuzLaLOqJ8cF8kOaihooH1zwUx/QxfJHIDNK2Z92OJy1v4aOzdzDUGkankf6Q=="
# type1: 'json'
# listYN = 'Y' # 목록 구분
# arrange = 'B' # 정렬 구분 (A=제목순, B=조회순, C=수정일순, D=생성일순, E=거리순)
# contentTypeId = '' # 관광타입
# mapX = '128.6922646449'
# mapY = '35.9910080699' 
# radius = '10000'
# modifiedtime='' #콘텐츠수정일

# parameters = {"numOfRows" : numOfRows, "pageNo" : pageNo, "MobileOS" : MobileOS, "MobileApp" : MobileApp, 
#             "serviceKey": MyserviceKey, "_type": type1, "listYN" : listYN,  "arrange" : arrange, "contentTypeId" : contentTypeId,
#             "mapX" : mapX,"mapY" : mapY, "radius" : radius,"modifiedtime":modifiedtime}

# response = requests.get(serviceUrl, params=parameters)

# print(response.text)