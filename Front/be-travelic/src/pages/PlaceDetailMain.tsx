import { DetailInfo, DetailRecommend, MapContainer } from "../components/index";
import "./css/PlaceDetailMain.css";

const DetailData = 
  {
  id: 1,
  category: '관광지',
  title: '경복궁',
  imgUrl: '',
  rating: 4,
  address: '서울특별시 종로구 사직로 161',
  phoneNumber: '02-3700-3900',
  detail: '경복궁은 1395년 태조 이성계에 의해서 새로운 조선왕조의 법궁으로 지어졌다. 경복궁은 동궐(창덕궁)이나 서궐(경희궁)에 비해 위치가 북쪽에 있어 북궐이라 불리기도 했다. 경복궁은 5대 궁궐 가운데 으뜸의 규모와 건축미를 자랑한다. 경복궁은 임진왜란 때 상당수의 건물이 불타 없어진 아픔을 갖고 있으며, 고종 때에 흥선대원군의 주도 아래 7,700여칸에 이르는 건물들을 다시 세웠다. 그러나 또 다시 명성황후 시해사건이 일어나면서 왕조의 몰락과 함께 경복궁도 왕궁으로서의 기능을 상실하고 말았다. 경복궁에는 조선시대의 대표적인 건축물인 경회루와 향원정의 연못이 원형대로 남아 있으며, 근정전의 월대와 조각상들은 당시의 조각미술을 대표한다. 현재 흥례문 밖 서편에는 국립고궁 박물관이 위치하고 있고, 경복궁 내 향원정의 동편에는 국립민속 박물관이 위치하고 있다.',
  lat: 37.57759797024925,
  lng: 126.97689221271072,
  }

const RecommendData = [
  {
  title: '남산타워',
  imgUrl: '',
  },
  {
    title: '불국사',
    imgUrl: '',
  },
  {
    title: '롯데월드',
    imgUrl: '',
  },
  {
    title: '해인사',
    imgUrl: '',
  }
];

function PlaceDetailMain() {
  return (
    <div>
      <div>
      {/* 여행지 상세정보 */}
        <DetailInfo
        id={DetailData.id}
        category={DetailData.category}
        title={DetailData.title}
        imgUrl={DetailData.imgUrl}
        rating={DetailData.rating}
        address={DetailData.address}
        detail={DetailData.detail}
        phoneNumber={DetailData.phoneNumber}
      />

      </div>

      <div className="container px-5 mx-auto">
        <div id="kakaomap">
          <MapContainer
            lat={DetailData.lat}
            lng={DetailData.lng}
          />
        </div>
      </div>
      
      {/* 추천여행지 카드 */}
      <section className="text-gray-600 body-font">
        <div className="container px-5 py-24 mx-auto">
          <div className="flex flex-col text-center w-full mb-10">
            <h1 className="text-2xl font-medium title-font mb-4 text-gray-900">다른 여행지는 어때요? 😎</h1>
            <hr/>
          </div>

          <div className="flex flex-wrap -m-4">
              {RecommendData.map((place) => (
                <DetailRecommend
                title={place.title}
                imgUrl={place.imgUrl}
                />
              ))}
          </div>

        </div>
      </section>
    </div>
  )
}

export default PlaceDetailMain