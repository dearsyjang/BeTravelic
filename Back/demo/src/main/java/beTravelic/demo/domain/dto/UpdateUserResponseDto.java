package beTravelic.demo.domain.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class UpdateUserResponseDto {
    private String accessToken;
    private String refreshToken;
}
