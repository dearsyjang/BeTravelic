package beTravelic.demo.domain.entity;


import lombok.*;

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
        following.getFollowings().add(this);
        this.following = following;
    }
    public void  setFollower(User follower){
        follower.getFollowers().add(this);
        this.follower = follower;
    }



}
