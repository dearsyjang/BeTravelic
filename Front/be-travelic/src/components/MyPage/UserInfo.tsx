import React, { useLayoutEffect, useState } from "react";
import follow from "../../assets/image/follow.png";
import records from "../../assets/image/records.png";
import FollowModal from "../common/FollowModal";

interface follow {
  // follow에 받을 것 정의
}

const UserInfo = () => {
  const [followers, setFollowers] = useState(0);
  const [followees, setFollowees] = useState(0);
  const [travelRecords, setTravelRecords] = useState(0);
  const [showFollowModal, setShowFollowModal] = useState(false);
  const [tabNumber, setTabNumber] = useState(0);

  useLayoutEffect(() => {
    const initialData = async () => {
      // axios
    };
    initialData();
  }, []);

  const showModalHandler = (num: number) => {
    setShowFollowModal(true);
    setTabNumber(num);
  };

  return (
    <>
      {showFollowModal && (
        <FollowModal
          setShowFollowModal={setShowFollowModal}
          tabNumber={tabNumber}
        />
      )}
      <div className="border border-blue-200 m-5 rounded-2xl pt-2 px-3 pb-5">
        <div className="flex my-5 justify-between">
          <div
            className="flex mx-2 cursor-pointer"
            onClick={showModalHandler.bind(this, 1)}
          >
            <img src={follow} alt="" className="w-5 mx-2" />
            팔로워 {followers}
          </div>
          <div
            className="flex mx-2 cursor-pointer"
            onClick={showModalHandler.bind(this, 2)}
          >
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
    </>
  );
};

export default UserInfo;
