import { useEffect } from "react";
import "../css/RecommendList.css";
function RecommendList() {
  return (
    <div>
      <div id='RecommendList_Head'>
        <p>000 님을 위한 추천 여행지</p>
      </div>
      <div id='RecommendListIcons'>
        <div className='RecommendIconsItem'>
          <img src='../../assets/image/palace.png' alt='NOIMAGE' />
          관광지
        </div>
        <div className='RecommendIconsItem'>박물관</div>
        <div className='RecommendIconsItem'>축제</div>
        <div className='RecommendIconsItem'>레저&스포츠</div>
        <div className='RecommendIconsItem'>쇼핑</div>
        <div className='RecommendIconsItem'>음식점</div>
      </div>
      <h3>리스트 출력</h3>
    </div>
  );
}
export default RecommendList;
