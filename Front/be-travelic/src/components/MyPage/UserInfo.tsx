import React, { useLayoutEffect, useState } from "react";
import follow from "../../assets/image/follow.png";
import records from "../../assets/image/records.png";

const UserInfo = () => {
  const [followers, setFollowers] = useState(0);
  const [followees, setFollowees] = useState(0);
  const [travelRecords, setTravelRecords] = useState(0);

  useLayoutEffect(() => {
    const initialData = async () => {
      // axios
    };
    initialData();
  }, []);

  return (
    <div className="border border-blue-200 m-5 rounded-2xl pt-2 px-3 pb-5">
      <div className="flex my-5 justify-between">
        <div className="flex mx-2">
          <img src={follow} alt="" className="w-5 mx-2" />
          팔로워 {followers}
        </div>
        <div className="flex mx-2">
          <img src={follow} alt="" className="w-5 mx-2" />
          <p className="mr-10">필로잉 {followees}</p>
        </div>
      </div>
      <div className="flex">
        <div className="flex mx-2">
          <img src={records} alt="" className="w-5 mx-2" />
          여행기록 {travelRecords}
        </div>
      </div>
    </div>
  );
};

export default UserInfo;

<style>
    .container {
        
    }
    </style>;
