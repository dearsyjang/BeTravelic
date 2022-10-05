import { useNavigate } from "react-router-dom";

interface placeInfo {
  title: string;
  imgUrl: string;
  rating: number;
  address: string;
  detailInfo: string;
  placeId: number;
}

function RecommendListItem({
  title,
  imgUrl,
  rating,
  address,
  detailInfo,
  placeId,
}: placeInfo) {
  const onClickDetail = () => {
    navigate(`/place/${placeId}`);
  };
  const navigate = useNavigate();
  return (
    <div className='RecommendListItemContainer'>
      {/* 이미지 부분 */}
      <div className='RecommendPlaceImage'>
        <img src={imgUrl} />
      </div>
      {/* 정보 부분 */}
      <div>
        <div className='RecommendListTitle'>{title}</div>
        {/* 별점 표시 */}
        <div className='RecommendListRating'>
          {(function () {
            let stars = [];
            for (let i = 0; i < rating; i++) {
              stars.push(<span>★ </span>);
            }
            return stars;
          })()}
        </div>
        <div className='RecommendListAddress'>{address}</div>
        <div className='RecommendListDetail'>
          {detailInfo.slice(0, 40) + "..."}
        </div>
      </div>
      <div className='recommendDetailInfo_btn'>
        <button onClick={onClickDetail}>상세보기</button>
      </div>
    </div>
  );
}
export default RecommendListItem;
