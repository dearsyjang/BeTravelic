package beTravelic.demo.domain.dto;

import beTravelic.demo.domain.entity.Place;
import beTravelic.demo.domain.entity.Review;
import beTravelic.demo.domain.entity.User;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.util.Date;
import java.util.List;

@Getter
@Builder
@AllArgsConstructor
public class ReviewResDto {

    private Long reviewId;

    private Long place;

    private Long user;

    private Long region;

    private String contents;

    // 이미지 주소
    private String fileName;
    private String realFileName;

    private Long score;

    private Date created_at;

    private String visited_at;

    private int reviewLike;

//    @Setter
//    List<CommentResponseDto> comments;

    public static ReviewResDto of(Review review) {
        return ReviewResDto.builder()
                .reviewId(review.getReviewId())
                .place(review.getPlace().getPlaceId())
                .user(review.getUser().getUser_id())
                .region(review.getRegion().getRegionId())
                .contents(review.getContents())
                .fileName(review.getFileName())
                .realFileName(review.getRealFileName())
                .score(review.getScore())
                .created_at(review.getCreated_at())
                .visited_at(review.getVisited_at())
                .reviewLike(review.getReviewLike())
                .build();
    }
//    public static ReviewResDto of(Review review) {
//        return ReviewResDto.builder()
//                .reviewId(review.getReviewId())
//                .place(review.getPlace().getPlaceId())
//                .user(review.getUser().getUserId())
//                .region(review.getRegion().getRegion_id())
//                .contents(review.getContents())
//                .image(review.getImage())
//                .score(review.getScore())
//                .created_at(review.getCreated_at())
//                .visited_at(review.getVisited_at())
//                .build();
//    }


    public ReviewResDto (Review review) {
        this.reviewId = review.getReviewId();
        this.place = review.getPlace().getPlaceId();
        this.user = review.getUser().getUser_id();
        this.region = review.getRegion().getRegionId();
        this.contents = review.getContents();
        this.fileName = review.getFileName();
        this.realFileName = review.getRealFileName();
        this.score = review.getScore();
        this.created_at = review.getCreated_at();
        this.visited_at = review.getVisited_at();
    }
}
