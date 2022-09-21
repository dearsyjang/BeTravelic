package beTravelic.demo.auth.dto;

import io.swagger.annotations.ApiParam;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class TokenRequestDto {
    @ApiParam(value = "엑서스토큰", required = true)
    private String accessToken;
    @ApiParam(value = "리프레시토큰", required = true)
    private String refreshToken;
}
