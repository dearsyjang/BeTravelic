package beTravelic.demo.domain.repository;


import beTravelic.demo.domain.dto.ReviewResDto;
import beTravelic.demo.domain.entity.Region;
import beTravelic.demo.domain.entity.Review;
import beTravelic.demo.domain.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.security.core.parameters.P;
import org.springframework.stereotype.Repository;


import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
@Repository
public interface ReviewRepository extends JpaRepository<Review, Long> {

    @Query("SELECT r FROM Review r WHERE r.user.id=:id AND r.region.regionId=:regionId")
//    ArrayList<ReviewResDto> findAllByUserAndRegion(User user, Region region);
    List<ReviewResDto> findAllByUserAndRegion(@Param("id") String id, @Param("regionId") Long regionId);

    Optional<Review> findReviewByReviewId(Long ReviewId);
    int countReviewByUser_Id(String id);

//    @Query("SELECT r from Review r WHERE r.region = :region")
//    ArrayList<Review> findAllByRegion(Region region);

//    List<ReviewResDto> findAllByUserAndRegion(Long regionId, Long userId);
}
