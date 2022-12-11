package beTravelic.demo.domain.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class GetAccessTokenResponseDto {

    private String accessToken;
}
