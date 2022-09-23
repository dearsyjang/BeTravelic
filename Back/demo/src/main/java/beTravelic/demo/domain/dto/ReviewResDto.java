package beTravelic.demo.domain.dto;

import beTravelic.demo.domain.entity.Review;
import lombok.Getter;
import lombok.Setter;

import java.util.Date;
import java.util.List;

@Getter
public class ReviewResDto {

    private Long reviewId;

    private Long placeId;

    private Long userId;

    private String contents;

    // 이미지 주소
    private String image;

    private Long score;

    private Date createdAt;

    private String visitedAt;

    @Setter
    List<CommentResponseDto> comments;

    public ReviewResDto(Review entity) {
        this.reviewId = entity.getReviewId();
        this.placeId = entity.getPlace().getPlaceId();
        this.userId = entity.getUser().getUserId();
        this.contents = entity.getContents();
        this.image = entity.getImage();
        this.score = entity.getScore();
        this.createdAt = entity.getCreatedAt();
        this.visitedAt = entity.getVisitedAt();
    }
}
