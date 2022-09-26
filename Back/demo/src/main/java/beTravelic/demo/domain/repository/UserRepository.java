package beTravelic.demo.domain.repository;

import beTravelic.demo.domain.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {
    // 로그인 : 사용자 아이디 비번 일치 확인
    Optional<User> findUserByIdAndPw(String id, String pw);
    // 사용자 정보 조회
    Optional<User> findUserById(String id);
    Optional<User> findUserByUserId(long user_Id);
    // 닉네임 중복 확인
    boolean existsUserByNickname(String nickname);

    User findByUserId(Long userId);

//    User findByUserId(Long userId);

//    User findUserByUserId(Long userId);



}
