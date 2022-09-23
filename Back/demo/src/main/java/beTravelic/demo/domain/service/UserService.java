package beTravelic.demo.domain.service;

import beTravelic.demo.domain.dto.*;
import beTravelic.demo.domain.exception.DuplicatedNickNameException;
import beTravelic.demo.domain.entity.User;
import beTravelic.demo.domain.repository.UserRepository;
import beTravelic.demo.global.util.jwt.JwtProvider;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.io.IOException;

@Service
@RequiredArgsConstructor
public class UserService {
    private final JwtProvider jwtProvider;
    private final UserRepository userRepository;
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
    public void checkNickname(String nickname) {
        if(userRepository.existsUserByNickName(nickname)) throw new DuplicatedNickNameException(nickname);
    }
    // 사용자 정보 조회
    public UserInfoResponseDto getUserInfo(String id) {
        User user = userRepository.findUserById(id).orElseThrow(() ->
             new RuntimeException("일치하는 사용자 없음"));
        return UserInfoResponseDto.ofUser(user);
    }
}
