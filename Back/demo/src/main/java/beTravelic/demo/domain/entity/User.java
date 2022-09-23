package beTravelic.demo.domain.entity;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

@Entity
@Getter
@NoArgsConstructor
public class User {
    @Id
    @Column(name = "userSeq") @GeneratedValue
    private Long userSeq;
    private String id;
    private String pw;

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
