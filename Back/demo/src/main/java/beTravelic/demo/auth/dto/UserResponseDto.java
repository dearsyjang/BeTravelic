package beTravelic.demo.auth.dto;

import beTravelic.demo.domain.User;
import io.swagger.annotations.ApiParam;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@AllArgsConstructor
@NoArgsConstructor
public class UserResponseDto {
    @ApiParam(value = "유저이메일", required = true)
    private String email;
    public static UserResponseDto of(User user){

        return new UserResponseDto(user.getEmail());
    }
}