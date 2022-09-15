import { DetailInfo, DetailRecommend } from "../components/index";


const DetailData = [
  {
  category: '관광지',
  title: '불국사',
  imgUrl: '',
  rating: 4.3,
  address: '경상북도 경주시 진현동 15-1',
  phoneNumber: '054-746-9913',
  detail: '경주 불국사 대웅전은 경상북도 경주시, 불국사의 대웅전으로 조선시대의 건축물이다. 2011년 12월 30일 대한민국의 보물 제1744호로 지정되었다. 석가여래 부처님을 모시는 법당으로, 불국사 경 내 중심이 되는 건물이다.',
  },
];

const RecommendData = [
  {
  title: '석굴암',
  imgUrl: '',
  },
  {
    title: '동궁 월지',
    imgUrl: '',
  },
  {
    title: '첨성대',
    imgUrl: '',
  },
  {
    title: '경주월드',
    imgUrl: '',
  }
];



function PlaceDetailMain() {
  return (
    <div>
      <div>
      {DetailData.map((place) => (
        <DetailInfo
          category={place.category}
          title={place.title}
          imgUrl={place.imgUrl}
          rating={place.rating}
          address={place.address}
          detail={place.detail}
          phoneNumber={place.phoneNumber}
        />
      ))}
      </div>
      <div>
        {RecommendData.map((place) => (
          <DetailRecommend
            title={place.title}
            imgUrl={place.imgUrl}
          />
        ))}
      </div>
    </div>
  )
}

export default PlaceDetailMain