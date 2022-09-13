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
      <div className='RecommendPlaceImage'>이미지 자리</div>
      {/* 정보 부분 */}
      <div>
        <div>{title}</div>
        <div>{imgUrl}</div>
        {/* 별점 표시 */}
        <div>
          {(function () {
            let stars = [];
            for (let i = 0; i < rating; i++) {
              stars.push(<span>★</span>);
            }
            return stars;
          })()}
        </div>
        <div>{address}</div>
        <div>{detailInfo}</div>
      </div>
    </div>
  );
}
export default RecommendListItem;
