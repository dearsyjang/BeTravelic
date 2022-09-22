import React from 'react';
import { useState  } from 'react';
import '../css/CommentsModal.css';
import { Link } from "react-router-dom";

interface props {
  open: boolean;
  close: boolean;
}

const CommentsModal = (props: any) => {
  // 모달 => 열기, 닫기를 부모로부터 받아옴
  const { open, close } = props;

  // 댓글
  const [comment, setReview] = useState('댓글내용');
  const [Comments, setReviewArray] = useState([
    { id: `닉네임`, imgUrl: '', comment: comment },
  ]);

  const handleReviewInput = (event: any) => {
    setReview(event.target.value);
  };

  const handleTotalEnter = (event: any) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      const repoArray = [...Comments];
      if (event.target.value !== '')
        repoArray.push({ id: '', imgUrl: '', comment: comment });
      setReviewArray(repoArray);
      event.target.value = '';
    }
  };

  return (
    // 모달이 열릴때 openModal 클래스가 생성된다.
    <div id="CommentModal" className={open ? 'openModal modal' : 'modal'}>
      {open ? (
        <section>
          {/* 닫기 버튼 */}
          <header>
            <button className="close" onClick={close}>
              &times;
            </button>
          </header>
 
          {/* 댓글 부분 */}
          <div id="CommentBody" className="flex items-center m-5">
            <div className="flex items-center m-5">
              {Comments.map(data => (
                <div key={data.id}>
                  <div className="inline-flex items-center">
                    <img
                      alt=""
                      className="w-8 h-8 rounded-full flex-shrink-0 object-cover object-center"
                      src="https://dummyimage.com/103x103"
                    />
                    <div className='flex-grow'>
                      <Link to={`/mypage`}>
                        <h2 className="title-font font-medium ml-3">{data.id} |</h2>
                      </Link>
                    </div>
                    <span id="CommentContent" className="title-font font-medium ml-3">{data.comment}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <hr/>
          <div id="CommentInputContainer" className="flex items-center mt-5">
            <input id="CommentInput"
                className="comment-input"
                type="text"
                placeholder="댓글를 입력해주세요."
                onKeyPress={event => {
                  handleTotalEnter(event);
                }}
                onKeyUp={event => {
                  handleReviewInput(event);
                }} />
          </div>

          <footer>
            {/* 혹시 모를 닫힘 버튼 */}
            {/* <button className="close" onClick={close}>
              close
            </button> */}
          </footer>
        </section>
      ) : null}
    </div>
  );
};


export default CommentsModal;