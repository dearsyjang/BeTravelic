import React, { useState } from "react";
import CloseButton from "../MyPage/CloseButton";

const FollowModal: React.FC<{
  setShowFollowModal: React.Dispatch<React.SetStateAction<boolean>>;
  tabNumber: number;
}> = ({ setShowFollowModal, tabNumber }) => {
  const closeFollowModalHandler = () => {
    setShowFollowModal(false);
  };

  const [openTab, setOpenTab] = useState(tabNumber);

  return (
    <div className="backdrop" onClick={closeFollowModalHandler}>
      <div className="modalContainer">
        <div className="flex flex-wrap">
          <div className="w-full">
            <ul
              className="flex mb-0 list-none flex-wrap pt-3 pb-4 flex-row"
              role="tablist"
            >
              <li className="-mb-px mr-2 last:mr-0 flex-auto text-center">
                <a
                  className={
                    "text-xs font-bold uppercase px-5 py-3 shadow-lg rounded block leading-normal " +
                    (openTab === 1
                      ? "text-white bg-" + "blue" + "-400"
                      : "bg-white")
                  }
                  onClick={(e) => {
                    e.preventDefault();
                    setOpenTab(1);
                  }}
                  data-toggle="tab"
                  href="#link1"
                  role="tablist"
                >
                  팔로워
                  {/* map으로 랜더링 */}
                </a>
              </li>
              <li className="-mb-px mr-2 last:mr-0 flex-auto text-center">
                <a
                  className={
                    "text-xs font-bold uppercase px-5 py-3 shadow-lg rounded block leading-normal " +
                    (openTab === 2
                      ? "text-white bg-" + "blue" + "-400"
                      : "bg-white")
                  }
                  onClick={(e) => {
                    e.preventDefault();
                    setOpenTab(2);
                  }}
                  data-toggle="tab"
                  href="#link2"
                  role="tablist"
                >
                  팔로잉
                  {/* map으로 랜더링 */}
                </a>
              </li>
            </ul>
            <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded">
              <div className="px-4 py-5 flex-auto">
                <div className="tab-content tab-space">
                  <div
                    className={openTab === 1 ? "block" : "hidden"}
                    id="link1"
                  ></div>
                  <div
                    className={openTab === 2 ? "block" : "hidden"}
                    id="link2"
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex justify-end" onClick={closeFollowModalHandler}>
          <CloseButton />
        </div>
      </div>
    </div>
  );
};

export default FollowModal;
