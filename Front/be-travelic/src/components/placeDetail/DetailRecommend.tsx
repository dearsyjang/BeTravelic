interface DetailRecommend {
  imgUrl: string;
  title: string;
}

function DetailRecommend({
  imgUrl,
  title,
}: DetailRecommend) {
  return (    
    <div className="DetailPlaceCard p-4 lg:w-1/4 md:w-1/2">
      <div className="h-full flex flex-col items-center text-center">
        <img alt="" className="flex-shrink-0 rounded-lg w-full h-56 object-cover object-center mb-4" src={imgUrl}/>
        <div className="w-full">
          <h2 className="title-font font-medium text-lg text-gray-900">{title}</h2>
        </div>
      </div>
    </div>
  )
}

export default DetailRecommend

