package beTravelic.demo.domain.service;

import beTravelic.demo.domain.dto.*;
import beTravelic.demo.domain.entity.Survey;
import beTravelic.demo.domain.exception.DuplicatedNickNameException;
import beTravelic.demo.domain.entity.User;
import beTravelic.demo.domain.exception.NoExistUserException;
import beTravelic.demo.domain.repository.FollowRepository;
import beTravelic.demo.domain.repository.ReviewRepository;
import beTravelic.demo.domain.repository.SurveyRepository;
import beTravelic.demo.domain.repository.UserRepository;
import beTravelic.demo.global.util.jwt.JwtProvider;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.io.IOException;

@Service
@RequiredArgsConstructor
@Transactional
public class UserService {
    private final JwtProvider jwtProvider;
    private final UserRepository userRepository;
    private final SurveyRepository surveyRepository;
    private final FollowRepository followRepository;
    private final ReviewRepository reviewRepository;
    // 회원가입
    @Transactional
    public SignupResponseDto signUpUser(SignUpRequestDto dto) throws IOException {
        User user = dto.toUserEntity();
        String accessToken = jwtProvider.getAccessToken(user.getId());
        String refreshToken = jwtProvider.getRefreshToken();
        user.updateRefreshToken(refreshToken);
        userRepository.save(user);
        return SignupResponseDto.of(accessToken, refreshToken);
    }

    // 로그인
    public LoginResponseDto login(LoginRequestDto dto) throws Exception {
        User user = userRepository.findUserByIdAndPw(dto.getId(), dto.getPw()).orElseThrow(() ->
                new Exception("에러 메시지"));
        return new LoginResponseDto(jwtProvider.getAccessToken(user.getId()), jwtProvider.getRefreshToken());
    }

    // 닉네임 중복 확인
    public isExistResponseDto checkNickname(String nickname) throws Exception {
        isExistResponseDto isExist = new isExistResponseDto();
        if(userRepository.existsUserByNickname(nickname)){
            isExist.setExist(true);
        }else{
            isExist.setExist(false);
        }
        return isExist;
    }
    public isExistResponseDto checkEmail(String email) throws Exception {
        isExistResponseDto isExist = new isExistResponseDto();
        if(userRepository.existsUserByEmail(email)){
            isExist.setExist(true);
        }else{
            isExist.setExist(false);
        }
        return isExist;
    }

    // 사용자 정보 조회
    public UserInfoResponseDto getUserInfo(String id) {
        User user = userRepository.findUserById(id).orElseThrow(() ->
             new RuntimeException("일치하는 사용자 없음"));
        Survey survey = surveyRepository.findSurveyByUser_Id(id).orElseThrow(() ->
                new RuntimeException("일치하는 사용자 없음"));
        int follower_cnt = followRepository.countByFollower_Id(id);
        int following_cnt = followRepository.countByFollowing_Id(id);
        int review_cnt = reviewRepository.countReviewByUser_Id(id);
        UserInfoResponseDto userInfoResponseDto = UserInfoResponseDto.ofUser(user, survey);
        userInfoResponseDto.setFollowerCnt(follower_cnt);
        userInfoResponseDto.setFollowingCnt(following_cnt);
        userInfoResponseDto.setreviewCnt(review_cnt);
        return userInfoResponseDto;
    }

    public GetAccessTokenResponseDto getAccessToken(String refreshToken) {
        User user = userRepository.findUserByRefreshToken(refreshToken).orElseThrow(() ->
            new NoExistUserException());
        return new GetAccessTokenResponseDto(jwtProvider.getAccessToken(user.getId()));
    }


}
