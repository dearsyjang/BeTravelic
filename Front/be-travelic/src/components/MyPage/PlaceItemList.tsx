import React from "react";
import { placeData } from "./PlaceContainer";
import PlaceItem from "./PlaceItem";

// interface PropsType {
//   //   children: JSX.Element;
//   data: placeData;
// }

const PlaceItemList = ({
  items,
}: {
  items: placeData[];
}): React.ReactElement => {

    console.log(items);
    

  const cardList = items.map((item: placeData) => {
    return (<PlaceItem item={item} />);
  });

  return <>{cardList}</>;
};

export default PlaceItemList;
