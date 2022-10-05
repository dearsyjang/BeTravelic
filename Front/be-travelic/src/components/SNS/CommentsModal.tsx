import React from 'react';
import { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import axios from 'axios';

import CommentItem from "./CommentItem"

import '../css/CommentsModal.css';
import  { FiSend } from 'react-icons/fi'

interface CommentsModal {
  open: any
  close: any
  review_id: number
}

function CommentsModal ( props: CommentsModal ) {
  const { open, close, review_id } = props;
  const accessToken = localStorage.getItem("accessToken");
  const [ comments, setComments ] = useState<CommentItem[]>([])

  // 댓글 GET (srping)
  const getComment = async() => {
    console.log('댓글 props', review_id)
    const response = await (await axios.get(`http://j7d205.p.ssafy.io:8443/feed/travel-review/${review_id}/comment`))
    console.log('comment', response.data)
    setComments(response.data)
  }

  useEffect(() => {
    getComment()
  }, [])

  // 댓글
  const [comment, setReview] = useState('');
  const [Comments, setReviewArray] = useState([
    { id: '', imgUrl: '', comment: comment },
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

  const postComment = async(event: any) => {
    console.log(review_id)
    console.log(comment)
    const response  = await axios.post(`http://j7d205.p.ssafy.io:8443/feed/travel-review/${review_id}/comment`,
    {},
    {
      headers: {
        Authorization: `${accessToken}`,
      },
      params: {
        contents: comment
      },
    }
    )
    console.log(response.data)
    if (response.data === 'true')
      setReview('');
  }

  return (
    <div id="CommentModal" className={open ? 'openModal modal' : 'modal'}>
      {open ? (
        <section>
          {/* 닫기 버튼 */}
          <header>
            <button className="close" onClick={close}>
              &times;
            </button>
          </header>

          <div>
            {comments.map((comment, index) => (
              <CommentItem
                key={index}
                commentId={comment.commentId}
                contents={comment.contents}
                createdAt={comment.createdAt}
                userId={comment.userId}
                review_id={review_id}
              />
            ))}
          </div>
 
          <div id="CommentInputContainer" className="flex items-center mt-5">
            <input id="CommentInput"
                className="comment-input"
                type="text"
                placeholder="댓글을 입력해주세요."
                onKeyPress={event => {
                  handleTotalEnter(event);
                }}
                onKeyUp={event => {
                  handleReviewInput(event);
                }} />
            <button onClick={event => {postComment(event)}} className="m-3 mr-30"><FiSend/></button>
          </div>
        </section>
      ) : null}
    </div>
  );

}

export default CommentsModal;