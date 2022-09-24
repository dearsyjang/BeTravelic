//package beTravelic.demo.domain.repository;
//
//import beTravelic.demo.domain.entity.Follow;
//import org.springframework.data.jpa.repository.JpaRepository;
//import org.springframework.data.jpa.repository.Modifying;
//import org.springframework.stereotype.Repository;
//import org.springframework.transaction.annotation.Transactional;
//
//@Repository
//public interface FollowRepository extends JpaRepository<Follow, Integer> {
//
//    int countByFollowerIdAndFollowingUserId(int id, String userId); // 팔로우 되어있는지 count하는 메서드
//
//    @Modifying
//    @Transactional
//    void deleteByFollowingIdAndFollowerId(int id1, int id2); // 언팔로우 메서드
//}
