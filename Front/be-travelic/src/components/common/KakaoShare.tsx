import React, { useEffect, useLayoutEffect, useRef } from "react";
import "../css/KakaoShare.css";

interface Kakao {
  placeId?: number;
  image?: string;
  title?: string;
  overview?: string;
}

const KakaoShare = ({ placeId, image, title, overview }: Kakao) => {
  //   const onShareKakaoHandler = shareKakao();
  const ref = useRef(false);

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
    if (!ref.current) {
      ref.current = true;
      console.log(ref.current);
      return;
    }
    console.log(ref.current);

    shareKakao();
  }, [title, image, placeId]);

  return (
    <div className="m-3">
      <button className="kakao">
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
