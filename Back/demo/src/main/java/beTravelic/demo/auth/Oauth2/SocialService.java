package beTravelic.demo.auth.Oauth2;

import beTravelic.demo.auth.dto.UserRequestDto;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class SocialService {

    private final KakaoService kakaoService;
    private final ObjectMapper objectMapper;

    public UserRequestDto verificationKakao(String code){

        UserRequestDto userRequestDto = new UserRequestDto();
        // 코드를 이용하여 accessToken 추출
        String accessToken = kakaoService.getAccessTokenByCode(code);
        // accessToken을 이용하여 사용자 정보 추출
        String userInfo = kakaoService.getUserInfoByAccessToken(accessToken);

        try {
            JsonNode jsonNode = objectMapper.readTree(userInfo);
            String email = String.valueOf(jsonNode.get("kakao_account").get("email"));
            userRequestDto.setEmail(email.substring(1, email.length() - 1));
        } catch (JsonProcessingException e) {
            e.printStackTrace();
        }
        return userRequestDto;
    }
}
