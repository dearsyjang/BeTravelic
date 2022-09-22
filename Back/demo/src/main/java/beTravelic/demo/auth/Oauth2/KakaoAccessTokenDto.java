package beTravelic.demo.auth.Oauth2;

import lombok.Getter;

@Getter
public class KakaoAccessTokenDto {
    private String access_token;
    private String token_type;
    private String refresh_token;
    private String expires_in;
    private String scope;
    private String refresh_token_expires_in;

}
