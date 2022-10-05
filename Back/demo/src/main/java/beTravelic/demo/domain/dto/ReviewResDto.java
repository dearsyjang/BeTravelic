package beTravelic.demo.domain.dto;

import beTravelic.demo.domain.entity.Review;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

import java.util.Date;

@Getter
@Builder
@AllArgsConstructor
public class ReviewResDto {

    private Long reviewId;

    private Long placeId;
    private String placeName;

    private String user;

    private Long regionId;

    private String regionName;

    private String contents;

    // 이미지 주소
    private String image;
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
                .placeId(review.getPlace().getPlaceId())
                .placeName(review.getPlace().getTitle())
                .user(review.getUser().getId())
                .regionId(review.getRegion().getRegionId())
                .regionName(review.getRegion().getDo_gwangyuksi())
                .contents(review.getContents())
                .image(review.getFileName())
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
        this.placeId = review.getPlace().getPlaceId();
        this.placeName = review.getPlace().getTitle();
        this.user = review.getUser().getId();
        this.regionId = review.getRegion().getRegionId();
        this.regionName = review.getRegion().getDo_gwangyuksi();
        this.contents = review.getContents();
        this.image = review.getFileName();
        this.realFileName = review.getRealFileName();
        this.score = review.getScore();
        this.created_at = review.getCreated_at();
        this.visited_at = review.getVisited_at();
    }
}
