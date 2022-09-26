package beTravelic.demo.domain.entity;


//    @Builder
//    public Follow(User userSeq, String follower, String following){
//        this.follower = follower;
//        this.following = following;
//        this.userSeq = userSeq;
//    }

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Setter
@Getter
@NoArgsConstructor
public class Follow {

    @Id @GeneratedValue
    @Column(name = "follow_id")
    private Long follow_id;

    @ManyToOne
    private User following;

    @ManyToOne
    private User follower;

    public void setFollowing(User following){
        following.getFollowing().add(this);
        this.following = following;
    }
    public void  setFollower(User follower){
        follower.getFollower().add(this);
        this.follower = follower;
    }



}
