import "../css/PlaceDetail.css"

interface DetailRecommend {
  imgUrl: string;
  title: string;
}

function DetailRecommend({
  imgUrl,
  title,
}: DetailRecommend) {
  return (    
    <div id="DetailRecommendItem" className="items-center text-center m-4">
      <img alt="" className="h-40 rounded w-full object-cover object-center mb-6" src={imgUrl}/>
      <h2 className="title-font font-medium text-lg text-gray-900">{title}</h2>
    </div>
  )
}

export default DetailRecommend

