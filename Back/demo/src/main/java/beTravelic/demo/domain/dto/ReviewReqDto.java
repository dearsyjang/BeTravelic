//package beTravelic.demo.domain.dto;
//
//import beTravelic.demo.domain.entity.Place;
//import beTravelic.demo.domain.entity.Review;
//import beTravelic.demo.domain.entity.User;
//import lombok.Getter;
//import lombok.Setter;
//import lombok.ToString;
//
//import java.util.Date;
//
//@Setter
//@Getter
//@ToString
//public class ReviewReqDto {
//
//    private Long reviewId;
//
//    private String placeId;
//
//    private String userId;
//
//    private String contents;
//
//    // 이미지 주소
//    private String image;
//
//    private Long score;
//
//    private Date createdAt;
//
//    private String visitedAt;
//
//    public Review toEntity() {
//        return Review.builder()
//                .reviewId(this.reviewId)
//                .place(Place.builder().placeId(Long.valueOf(this.placeId)).build())
//                .user(User.builder().id(Long.valueOf(this.userId)).build())
//                .contents(this.contents)
//                .image(this.image)
//                .score(this.score)
//                .createdAt(this.createdAt)
//                .visitedAt(this.visitedAt)
//                .build();
//
//    }
//
//    public void setReviewUpdate(Date date) {
//    }
//}
