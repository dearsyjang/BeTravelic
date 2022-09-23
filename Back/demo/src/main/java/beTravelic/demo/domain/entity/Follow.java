package beTravelic.demo.domain.entity;


import lombok.AccessLevel;
import lombok.Builder;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Setter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Follow {

    @Id @GeneratedValue
    @Column(name = "followSeq")
    private Long followSeq;

    @ManyToOne
    @JoinColumn(name = "userSeq")
    private User userId;
    private String following_user_id;
    private String follower_user_id;

    @Builder
    public Follow(User userId, String follower_user_id, String following_user_id){
        this.follower_user_id = follower_user_id;
        this.following_user_id = following_user_id;
    }

}
