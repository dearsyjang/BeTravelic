package beTravelic.demo.domain.repository;

import beTravelic.demo.domain.entity.Follow;
import beTravelic.demo.domain.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface FollowRepository extends JpaRepository<Follow, Long> {
    @Query("SELECT f FROM Follow f WHERE f.follower.user_id=:followId AND f.following.id=:id")
    Optional<Follow> findFollowByFollower(@Param("followId") Long followId, @Param("id") String id);
//    @Query("SELECT f FROM Follow f WHERE f.following=:userId")
//    Optional<Follow> findFollowByFollowing(@Param("userId") Long userId);
    List<Follow> findFollowByFollowing_Id(String Id);

    List<Follow> findFollowByFollower_Id(String Id);

    int countByFollower_Id(String id);
    int countByFollowing_Id(String id);
    @Query("SELECT f FROM Follow f WHERE f.follower.user_id=:userId")
    List<Follow> findFollowByFollowerUserId(@Param("userId") Long userId);

    @Query("SELECT f FROM Follow f WHERE f.following.user_id=:userId")
    List<Follow> findFollowByFollowingUserId(@Param("userId") Long userId);
    @Query("SELECT COUNT(f.follow_id) as cnt FROM Follow f WHERE f.following.user_id=:userId")
    int countByFollowing_UserId(@Param("userId") Long userId);

    @Query("SELECT COUNT(f.follow_id) as cnt FROM Follow f WHERE f.follower.user_id=:userId")
    int countByFollower_UserId(@Param("userId") Long userId);

    @Query("SELECT f FROM Follow f WHERE f.follower.id=:id AND f.following.user_id=:userId")
    Follow findFollowByFollowerIdAndFollowingId(@Param("id") String id, @Param("userId") Long userId);

//    Optional<Follow> findFollowingById(Long id);
//    List<Follow> findFollowerByUser_Id(String id);
//
//    int countByFollowerIdAndFollowingUserId(int id, String userId); // 팔로우 되어있는지 count하는 메서드
//
//    @Modifying
//    @Transactional
//    void deleteByFollowingIdAndFollowerId(int id1, int id2); // 언팔로우 메서드
}
