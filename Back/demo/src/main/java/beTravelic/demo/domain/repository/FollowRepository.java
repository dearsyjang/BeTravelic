package beTravelic.demo.domain.repository;

import beTravelic.demo.domain.entity.Follow;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.awt.font.ShapeGraphicAttribute;
import java.util.List;
import java.util.Optional;

@Repository
public interface FollowRepository extends JpaRepository<Follow, Long> {
    Optional<Follow> findFollowByFollower(String id);
    Optional<Follow> findFollowByFollowing(String id);
    List<Follow> findFollowByFollowing_Id(String id);

    List<Follow> findFollowByFollower_Id(String id);

    int countByFollower_Id(String id);
    int countByFollowing_Id(String id);

//    Optional<Follow> findFollowingById(Long id);
//    List<Follow> findFollowerByUser_Id(String id);
//
//    int countByFollowerIdAndFollowingUserId(int id, String userId); // 팔로우 되어있는지 count하는 메서드
//
//    @Modifying
//    @Transactional
//    void deleteByFollowingIdAndFollowerId(int id1, int id2); // 언팔로우 메서드
}
