package beTravelic.demo.domain.entity;

import lombok.*;

import javax.persistence.*;

//  좋아요
@Builder
@Entity
@Getter
@AllArgsConstructor
@NoArgsConstructor
@ToString
@Table(name="review_like")
public class ReviewLike {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    @Column(name = "like_id")
    private Long like_id;

    //    리뷰
    @ManyToOne
    @JoinColumn(name = "review_id")
    private Review review;

    //    유저
    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    public void setReview(Review review) {
        this.review = review;
    }

    public void setUser(User user) {
        this.user = user;
    }
}
