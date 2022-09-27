package beTravelic.demo.domain.service;


import beTravelic.demo.domain.dto.CommentSaveRequestDto;
import beTravelic.demo.domain.dto.CommentSaveResponseDto;
import beTravelic.demo.domain.dto.CommentUpdateRequestDto;
import beTravelic.demo.domain.dto.CommentUpdateResponseDto;
import beTravelic.demo.domain.entity.Comment;
import beTravelic.demo.domain.entity.Review;
import beTravelic.demo.domain.entity.User;
import beTravelic.demo.domain.repository.CommentRepository;
import beTravelic.demo.domain.repository.ReviewRepository;
import beTravelic.demo.domain.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.Setter;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Date;

@Slf4j
@Service
@RequiredArgsConstructor
public class CommentService {

    private final CommentRepository commentRepository;

    private final UserRepository userRepository;
    private final ReviewRepository reviewRepository;

    @Transactional
    public CommentSaveResponseDto commentSave(String id, Long reviewId, CommentSaveRequestDto dto){
        Comment comment = dto.toCommentEntity();
        Review review = reviewRepository.findReviewByReviewId(reviewId).orElseThrow(() ->
                new RuntimeException("일치하는 게시글이 없음"));
        User user = userRepository.findUserById(id).orElseThrow(() ->
                new RuntimeException("일치하는 사용자가 없음"));
        comment.setUser(user);
        comment.setReview(review);
        commentRepository.save(comment);
        return new CommentSaveResponseDto(comment.getComment_id());
    }

//    @Transactional
//    public void commentUpdate(String id, Long commentId, CommentUpdateRequestDto dto) throws Exception {
//        // commentId 인자로 필요 없을지도?
//        int result = commentRepository.commentUpdate(id, dto.getContents());
//        if (result == 0) {
//            log.info("댓글 수정에 실패하였습니다.");
//            throw new Exception("댓글 수정 실패");
//        }
//        log.info("댓글 수정하였습니다.");
////        Comment comment = commentRepository.findCommentByCommentId(commentId).orElseThrow(() ->
////                new RuntimeException("일치하는 댓글이 없음"));
////
////        User user = userRepository.findUserById(id).orElseThrow(() ->
////                new RuntimeException("일치하는 사용자가 없음"));
////
////        if(user.getUserId().equals(comment.getUser().getUserId())){
////            Date date = new Date();
////            comment.update(date, dto.getContents());
////            return new CommentUpdateResponseDto(comment.getComment_id());
////        }else{
////            new RuntimeException("실패");
////            throw new Exception("실패");
////        }
//    }
//
    @Transactional
    public void commentDelete(String id, Long commentId) throws Exception {
        Comment comment = commentRepository.findById(commentId).orElseThrow(() ->
                new RuntimeException("일치하는 댓글이 없음"));

        User user = userRepository.findUserById(id).orElseThrow(() ->
                new RuntimeException("일치하는 사용자가 없음"));

        if(user.getUserId().equals(comment.getUser().getUserId())){
            commentRepository.delete(comment);
        }else{
            new RuntimeException("실패");
            throw new Exception("댓글 작성자가 아닙니다.");
        }
    }
}
