package beTravelic.demo.auth.dto;

import beTravelic.demo.domain.User;
import io.swagger.annotations.ApiParam;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@AllArgsConstructor
@NoArgsConstructor
public class UserInfoResponseDto {
    @ApiParam(value = "유저번호", required = true)
    private Long id;

    @ApiParam(value = "이메일", required = true)
    private String email;

    @ApiParam(value = "닉네임", required = true)
    private String nickname;

    public static UserInfoResponseDto convert(User user){
        return new UserInfoResponseDto(user.getUserId(), user.getEmail(), user.getNickname());
    }

}
