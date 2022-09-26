package beTravelic.demo.domain.dto;


import beTravelic.demo.domain.entity.User;
import lombok.Data;

import javax.validation.constraints.NotBlank;

@Data
public class SignUpRequestDto {
    @NotBlank(message = "id는 비워둘 수 없습니다.")
    private String id;

    @NotBlank(message = "pw는 비워둘 수 없습니다.")
    private String pw;

    @NotBlank(message = "nickname은 비워둘 수 없습니다.")
    private String nickname;

    @NotBlank(message = "email 비워둘 수 없습니다.")
    private String email;

    public User toUserEntity(){
        return User.builder()
                .id(this.id)
                .pw(this.pw)
                .nickname(this.nickname)
                .email(this.email)
                .build();
    }

}
