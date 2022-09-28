package beTravelic.demo.domain.dto;

import beTravelic.demo.domain.entity.Comment;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.Getter;

import java.util.Date;

@Data
@Getter
@Builder
@AllArgsConstructor
public class CommentResDto {

    private Long commentId;

    private Long reviewId;

    private Long userId;

    private String contents;

    private Date createdAt;

    public CommentResDto (Comment comment) {
        this.commentId = comment.getComment_id();
        this.reviewId = comment.getReview().getReviewId();
        this.userId = comment.getUser().getUser_id();
        this.contents = comment.getContents();
        this.createdAt = comment.getCreated_at();
    }

}
