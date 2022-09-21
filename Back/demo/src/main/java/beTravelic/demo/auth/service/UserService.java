package beTravelic.demo.auth.service;

import beTravelic.demo.auth.dto.UserInfoResponseDto;
import beTravelic.demo.auth.dto.UserRequestDto;
import beTravelic.demo.auth.repository.UserRepository;
import beTravelic.demo.domain.User;
import beTravelic.demo.global.util.jwt.SecurityUtil;
import lombok.RequiredArgsConstructor;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import javax.persistence.NoResultException;
import java.util.List;
import java.util.NoSuchElementException;

@Service
@RequiredArgsConstructor
public class UserService {
    private final UserRepository userRepository;
    private final EntityManager em;
    private final PasswordEncoder passwordEncoder;

    @Transactional(readOnly=true)
    public User getUserInfo(String email) {
        return userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("유저 정보가 없습니다."));
    }

    public User getUserInfo(int userSeq){
        return em.find(User.class, userSeq);
    }

    public User getUserByNickname(String nickname){
        return em.createQuery("select u from User u where u.nickname=:nickname", User.class)
                .setParameter("nickname", nickname)
                .getSingleResult();
    }

    @Transactional(readOnly=true)
    public User getMyInfo() {
        // SecurityUtil.getCurrentUserId() 여기서 UserId를 받아오기 때문에
        return userRepository.findById(SecurityUtil.getCurrentUserId())
                .orElseThrow(() -> new RuntimeException("로그인 유저 정보가 없습니다."));
    }

    @Transactional(readOnly = true)
    public boolean checkEmail(String email) {
        return userRepository.existsByEmail(email);
        //em.createQuery("SELECT m.UserSeq FROM USER m WHERE m.email=:email", User.class).setParameter("email", email).getSingleResult();
    }

    @Transactional(readOnly = true)
    public boolean checkNickname(String nickname) {
        return userRepository.existsByNickname(nickname);
    }

    @Transactional(readOnly = false)
    public UserInfoResponseDto enrollNickname(String nickname) {
        if (userRepository.existsByNickname(nickname)) {
            throw new RuntimeException("이미 등록된 닉네임입니다");
        }
        User user = em.find(User.class, SecurityUtil.getCurrentUserId());
        user.setNickname(nickname);
        return UserInfoResponseDto.convert(user);
    }

    @Transactional(readOnly = false)
    public void deleteUser() {
        User user = em.find(User.class, SecurityUtil.getCurrentUserId());
        userRepository.delete(user);
    }

    @Transactional(readOnly = true)
    public boolean checkPw(String password) {
        User user = em.find(User.class, SecurityUtil.getCurrentUserId());

        return  passwordEncoder.matches(password, user.getPw());
    }

    @Transactional
    public void changePw(UserRequestDto userRequestDto) {
        User user = em.createQuery("SELECT u FROM User u WHERE u.email like :email", User.class).setParameter("email", userRequestDto.getEmail()).getSingleResult();
        User changeUser = em.find(User.class, user.getUserId());
        changeUser.setPw(passwordEncoder.encode(userRequestDto.getPw()));
        //return user;

    }

    @Transactional(readOnly = true)
    public User userInformation(String nickname) {
        return userRepository.findByNickname(nickname)
                .orElseThrow(() -> new NoSuchElementException(nickname));
    }

    @Transactional(readOnly = true)
    public List findByNickname(String nick) {
        try {
            return em.createQuery("SELECT u FROM User u WHERE u.nickname LIKE CONCAT('%', :nick, '%')", User.class)
                    .setParameter("nick", nick).getResultList();
        } catch (NoResultException e) {
            throw new NoResultException();
        }
    }

    @Transactional(readOnly = true)
    public List isLoginUser() {
        return  em.createQuery("SELECT u.nickname, u.winCount, u.loseCount, u.rankPoint, u.isRedUser, u.nowRoomSeq FROM User u WHERE u.isLogin = true").getResultList();
    }

}

