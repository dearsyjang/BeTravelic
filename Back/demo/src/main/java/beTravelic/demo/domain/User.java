package beTravelic.demo.domain;

import lombok.*;
import org.springframework.security.authentication.jaas.AuthorityGranter;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;


@Entity
@Getter @Setter
@NoArgsConstructor
public class User {

    @Id
    @GeneratedValue
    @Column(name = "user_id")
    private Long userId;
    private String pw;
    @Column(nullable = false)
    private String email;

    private String nickname;
    private String age_range;
    private String gender;
    @Enumerated(EnumType.STRING)
    private Authority authority;

    @Builder
    public User(Long id, String email, String gender, String age_range, String pw, Authority authority) {
        this.pw = pw;
        this.email = email;
        this.gender = gender;
        this.age_range = age_range;
        this.authority = authority;
    }
}
