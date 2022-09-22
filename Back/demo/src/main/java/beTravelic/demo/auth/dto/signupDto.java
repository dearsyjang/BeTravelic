package beTravelic.demo.auth.dto;

import beTravelic.demo.domain.User;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@AllArgsConstructor
@NoArgsConstructor
public class signupDto {
    private Long id;

    private String email;

    public static signupDto convert(User user){

        return new signupDto(user.getUserId(), user.getEmail());
    }
}