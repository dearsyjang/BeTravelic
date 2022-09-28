import React from "react";
import { PlaceData } from "./PlaceContainer";
import PlaceItem from "./PlaceItem";

// interface PropsType {
//   //   children: JSX.Element;
//   data: PlaceData;
// }

const PlaceItemList = ({
  items,
}: {
  items: PlaceData[];
}): React.ReactElement => {

    console.log(items);
    

  const cardList = items.map((item: PlaceData) => {
    return (<PlaceItem item={item} />);
  });

  return <>{cardList}</>;
};

export default PlaceItemList;
