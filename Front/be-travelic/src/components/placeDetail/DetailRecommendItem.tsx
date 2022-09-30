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
  const { place_id, addr, score, mapx, title, image, overview } = props

  return (
    <div id="DetailRecommendItem" className="items-center text-center m-4">
      <img alt="" className="h-40 rounded w-full object-cover object-center mb-6" src={image} />
      <Link to ={`/places/${place_id}`}>
        <h2 className="title-font font-medium text-lg text-gray-900">{title}</h2>
      </Link>
    </div>
  )
}

export default DetailRecommendItem