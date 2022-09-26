package beTravelic.demo.domain.dto;

import beTravelic.demo.domain.entity.Follow;
import beTravelic.demo.domain.entity.User;
import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@JsonInclude(value = JsonInclude.Include.NON_NULL)
@Builder
public class UserInfoResponseDto {
    private Long userId;
    private String id;
    private String pw;
    private String nickname;
    private String email;

    public static UserInfoResponseDto ofUser(User user){
        return UserInfoResponseDto.builder()
                .userId(user.getUserId())
                .id(user.getId())
                .pw(user.getPw())
                .nickname(user.getNickname())
                .email(user.getEmail())
                .build();
    }
}
