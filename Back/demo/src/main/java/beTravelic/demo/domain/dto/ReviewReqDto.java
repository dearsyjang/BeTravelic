package beTravelic.demo.domain.dto;

import beTravelic.demo.domain.entity.Place;
import beTravelic.demo.domain.entity.Region;
import beTravelic.demo.domain.entity.Review;
import beTravelic.demo.domain.entity.User;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
import org.springframework.web.multipart.MultipartFile;

import java.util.Date;

@Setter
@Getter
@ToString
public class ReviewReqDto {

    private Long reviewId;
    private Long place_id;

    private Long user_id;

    private Long regionId;

    private String contents;

    private Long score;

    private Date created_at;

    private String visited_at;

    private int reviewLike;


    public Review toEntity() {
        Date created_at = new Date();
        return Review.builder()
                .reviewId(this.reviewId)
                .place(Place.ReviewPlaceId().place_id(Long.valueOf(this.place_id)).build())
                .user(User.ReviewUserId().user_id((Long.valueOf(this.user_id))).build())
                .region(Region.ReviewRegionId().regionId((Long.valueOf(regionId))).build())
                .contents(this.contents)
                .score(this.score)
                .created_at(this.created_at)
                .visited_at(this.visited_at)
                .reviewLike(this.reviewLike)
                .build();
    }

//    public void setReviewUpdate(Date date) {
//    }
}
