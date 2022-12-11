import { Link } from "react-router-dom";

interface DetailRecommendItem {
  place_id: number;
  addr: string;
  score: number;
  mapx: string;
  mapy: string;
  title: string;
  image: string;
  overview: string;
}

function DetailRecommendItem( props: DetailRecommendItem ) {
  const { place_id, title, image } = props

  return (
    <div id="DetailRecommendItem" className="items-center text-center m-4">
      <Link to ={`/place/${place_id}`}>
        <img alt="" className="h-40 rounded w-full object-cover object-center mb-6" src={image} />
        <h2 className="title-font font-medium text-lg text-gray-900">{title}</h2>
      </Link>
    </div>
  )
}

export default DetailRecommendItem