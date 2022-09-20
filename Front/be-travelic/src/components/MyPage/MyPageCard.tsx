import React from "react";
import "../css/MyPageCard.css";
import FrequentPlace from "./FrequentPlace";
import InputProfilePhoto from "./InputProfilePhoto";
import TripStyle from "./TripStyle";
import UserInfo from "./UserInfo";

const MyPageCard = () => {
  return (
    <div className="cardContainer">
      <div>
        <InputProfilePhoto />
      </div>
      <div className="mt-10">
        <UserInfo />
      </div>
      <div className="mt-5">
        <TripStyle />
      </div>
      <div className="mt-5">
        <FrequentPlace />
      </div>
    </div>
  );
};

export default MyPageCard;
