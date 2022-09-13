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
    <div id='RecommendListItemContainer'>
      <div id='RecommendPlaceImage'>이미지 자리</div>
      <div>정보들 들어갈 곳</div>
    </div>
  );
}
