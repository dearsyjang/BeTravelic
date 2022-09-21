package beTravelic.demo.auth.dto;

import beTravelic.demo.domain.Authority;
import beTravelic.demo.domain.User;
import io.swagger.annotations.ApiParam;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;



@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class UserRequestDto {
    @ApiParam(value = "사용자 email", required = true)
    private String email;

    @ApiParam(value = "사용자 pw", required = true)

    private String pw;

    public User toUser(PasswordEncoder passwordEncoder) {
        return User.builder()
                .email(email)
                .pw(passwordEncoder.encode(pw))
                .authority(Authority.ROLE_USER)
                .build();
    }

    public User toOauthUser(PasswordEncoder passwordEncoder){
        return User.builder()
                .email(email)
                .pw(passwordEncoder.encode(pw))
                .authority(Authority.ROLE_USER)
                .build();
    }

    public UsernamePasswordAuthenticationToken toAuthentication() {
        return new UsernamePasswordAuthenticationToken(email, pw);
    }
}
