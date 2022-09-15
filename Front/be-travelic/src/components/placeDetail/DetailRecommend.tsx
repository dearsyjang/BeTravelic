interface DetailRecommend {
  imgUrl: string;
  title: string;
}


function DetailRecommend({
  imgUrl,
  title,
}: DetailRecommend) {
  return (
    <section className="text-gray-600 body-font">
      <div className="container px-5 py-24 mx-auto">

      <div className="flex flex-col text-center w-full mb-10">
        <p className="lg:w-2/3 mx-auto leading-relaxed text-base">이런 여행지는 어때요?</p>
      </div>

      <div className="flex flex-wrap -m-4">
        <div className="p-4 lg:w-1/4 md:w-1/2">
          <div className="h-full flex flex-col items-center text-center">
            <img alt="" className="flex-shrink-0 rounded-lg w-full h-56 object-cover object-center mb-4" src={imgUrl}/>
            <div className="w-full">
              <h2 className="title-font font-medium text-lg text-gray-900">{title}</h2>
            </div>
          </div>
        </div>
    </div>
  </div>
</section>
  )
}

export default DetailRecommend

