import React, { useEffect, useLayoutEffect } from "react";
import "../css/KakaoShare.css"

interface Kakao {
  placeId?: number;
  image?: string;
  title?: string;
  overview?: string;
}

const KakaoShare = ({ placeId, image, title, overview }: Kakao) => {
  //   const onShareKakaoHandler = shareKakao();

  const shareKakao = () => {
    window.Kakao.Share.createDefaultButton({
      container: ".kakao",
      objectType: "feed",
      content: {
        title,
        imageUrl: image,
        link: {
          mobileWebUrl: `http://j7d205.p.ssafy.io/place/${placeId}`,
          webUrl: `http://j7d205.p.ssafy.io/place/${placeId}`,
        },
      },
      buttons: [
        {
          title: "보러 가기",
          link: {
            mobileWebUrl: `http://j7d205.p.ssafy.io/place/${placeId}`,
            webUrl: `http://j7d205.p.ssafy.io/place/${placeId}`,
          },
        },
      ],
    });
  };

  useEffect(() => {
    shareKakao();
  }, [title, image, placeId]);

  return (
    <div>
      <button className="kakao m-3">
        <img
          id="kakaologo"
          src="https://developers.kakao.com/assets/img/about/logos/kakaolink/kakaolink_btn_small.png"
          alt="카카오링크 보내기 버튼"
        />
        공유하기
      </button>
    </div>
  );
};

export default KakaoShare;
