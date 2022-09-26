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
import org.springframework.stereotype.Service;

import java.util.Date;

@Service
@RequiredArgsConstructor
public class CommentService {

//    private final CommentRepository commentRepository;
//
//    private final UserRepository userRepository;
//    private final ReviewRepository reviewRepository;
//
//    public CommentSaveResponseDto commentSave(String id, Long reviewId, CommentSaveRequestDto dto){
//        Comment comment = dto.toCommentEntity();
//        Review review = reviewRepository. findReviewByReview_id(reviewId).orElseThrow(() ->
//                new RuntimeException("일치하는 게시글이 없음"));
//        User user = userRepository.findUserById(id).orElseThrow(() ->
//                new RuntimeException("일치하는 사용자가 없음"));
//        comment.setUser(user);
//        comment.setReview(review);
//        commentRepository.save(comment);
//        return new CommentSaveResponseDto(comment.getComment_id());
//    }

//    public CommentUpdateResponseDto CommentUpdate(String id, Long CommentId, CommentUpdateRequestDto dto){
//        Comment comment = commentRepository.findCommentByComment_id(commentId).orElseThrow(() ->
//                new RuntimeException("일치하는 댓글이 없음"));
//
//        User user = userRepository.findUserById(id).orElseThrow(() ->
//                new RuntimeException("일치하는 사용자가 없음"));
//
//        if(user.getUser_id().equals(comment.getUser().getUser_id())){
//            Date date = new Date();
//            comment.update(date, dto.getContents());
//            return new CommentUpdateResponseDto(comment.getComment_id());
//        }else{
//            new RuntimeException("실패");
//        }
//    }
//
//    public CommentDelete(String id, Long CommentId){
//        Comment comment = commentRepository.findCommentByComment_id(commentId).orElseThrow(() ->
//                new RuntimeException("일치하는 댓글이 없음"));
//
//        User user = userRepository.findUserById(id).orElseThrow(() ->
//                new RuntimeException("일치하는 사용자가 없음"));
//
//        if(user.getUser_id().equals(comment.getUser().getUser_id())){
//            commentRepository.delete(comment);
//        }else{
//            new RuntimeException("실패");
//        }
//    }
}
