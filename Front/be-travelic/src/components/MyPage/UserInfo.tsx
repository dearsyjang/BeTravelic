import React, { useLayoutEffect, useState } from "react";
import follow from "../../assets/image/follow.png";
import records from "../../assets/image/records.png";
import FollowModal from "../common/FollowModal";
import { fetchFollows, fetchUserInfo, Follow } from "../../apis/mypage";
import { useParams } from "react-router-dom";

const UserInfo: React.FC = () => {
  const [followers, setFollowers] = useState(0);
  const [followees, setFollowees] = useState(0);
  const [travelRecords, setTravelRecords] = useState(0);
  const [showFollowModal, setShowFollowModal] = useState(false);
  const [tabNumber, setTabNumber] = useState(0);
  const [follows, setFollows] = useState<Follow[]>([]);
  const { userId } = useParams();

  useLayoutEffect(() => {
    const initialData = async () => {
      await fetchUserInfo();
    };
    initialData();
  }, []);

  const showModalHandler = async (identifier: string) => {
    //
    // const res = await fetchFollows(userId!, identifier);
    // setFollows(res.data);

    setShowFollowModal(true);

    const tabNum = identifier === "followerList" ? 1 : 2;
    setTabNumber(tabNum);
  };

  return (
    <>
      {showFollowModal && (
        <FollowModal
          setShowFollowModal={setShowFollowModal}
          tabNumber={tabNumber}
          follows={follows}
          setFollows={setFollows}
          userId={userId!}
        />
      )}
      <div className="border border-blue-200 m-5 rounded-2xl pt-2 px-3 pb-5">
        <div className="flex my-5 justify-between">
          <div
            className="flex mx-2 cursor-pointer"
            onClick={showModalHandler.bind(this, "followerList")}
          >
            <img src={follow} alt="" className="w-5 mx-2" />
            팔로워 {followers}
          </div>
          <div
            className="flex mx-2 cursor-pointer"
            onClick={showModalHandler.bind(this, "followingList")}
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
