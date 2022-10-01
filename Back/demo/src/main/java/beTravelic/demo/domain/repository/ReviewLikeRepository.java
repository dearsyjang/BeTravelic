package beTravelic.demo.domain.repository;

import beTravelic.demo.domain.entity.Review;
import beTravelic.demo.domain.entity.ReviewLike;
import beTravelic.demo.domain.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface ReviewLikeRepository extends JpaRepository<ReviewLike, Long> {
    ReviewLike findByUserAndReview(User user, Review review);
//    @Query("Select rl from ReviewLike rl Where rl.user=:user And rl.review=:review")
//    ReviewLike findByUserAndLike(User user, Review review);
}
