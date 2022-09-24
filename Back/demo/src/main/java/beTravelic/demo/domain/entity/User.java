package beTravelic.demo.domain.entity;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Getter
@NoArgsConstructor
public class User {
    @Id
    @Column(name = "userSeq")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long userSeq;

    @Column(name = "userId", nullable = false, unique = true)
    private String id;
    private String pw;
    @Column(unique = true)
    private String nickName;
    private String refreshToken;
    public void updateRefreshToken(String refreshToken){
        this.refreshToken = refreshToken;
    }
    @Builder
    public User(String pw, String id, String nickName){
        this.id = id;
        this.pw = pw;
        this.nickName = nickName;
    }

}
