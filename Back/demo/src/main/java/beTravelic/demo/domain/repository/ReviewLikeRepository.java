package beTravelic.demo.domain.repository;

import beTravelic.demo.domain.entity.Review;
import beTravelic.demo.domain.entity.ReviewLike;
import beTravelic.demo.domain.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface ReviewLikeRepository extends JpaRepository<ReviewLike, Long> {

/////////////
//    @Query("Select rl from ReviewLike rl Where rl.user=:user And rl.review=:review")
//    ReviewLike findByUserAndReview(@Param("user") User user, @Param("review") Review review);
    // 위아래 같은 코드 아래는 JPA, 위에는 일반 QUERy
    ReviewLike findByUserAndReview(User user, Review review);
/////////////
}
