package beTravelic.demo.auth.dto;

import io.swagger.annotations.ApiParam;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Builder
@Getter
public class TokenDto {
    @ApiParam(value = "토큰타입", required = true)
    private String grantType;
    @ApiParam(value = "엑세스 토큰", required = true)
    private String accessToken;
    @ApiParam(value = "리프레시 토큰", required = true)
    private String refreshToken;
    @ApiParam(value = "파기시간", required = true)
    private Long accessTokenExpiresIn;
}