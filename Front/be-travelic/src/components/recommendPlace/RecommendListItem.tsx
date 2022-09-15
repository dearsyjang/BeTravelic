interface placeInfo {
  title: string;
  imgUrl: string;
  rating: number;
  address: string;
  detailInfo: string;
}

function RecommendListItem({
  title,
  imgUrl,
  rating,
  address,
  detailInfo,
}: placeInfo) {
  return (
    <div className='RecommendListItemContainer'>
      {/* 이미지 부분 */}
      <div className='RecommendPlaceImage'>
        <img src={`${process.env.PUBLIC_URL}/logo192.png`} />
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
        <div className='RecommendListDetail'>{detailInfo}</div>
      </div>
      <div className='recommendDetailInfo_btn'>
        <button>상세보기</button>
      </div>
    </div>
  );
}
export default RecommendListItem;
