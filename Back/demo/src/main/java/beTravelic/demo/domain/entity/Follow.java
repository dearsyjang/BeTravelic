package beTravelic.demo.domain.entity;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.util.Lazy;

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
    @JoinColumn(referencedColumnName = "id", name = "following_user_id")
    private User following;

    @ManyToOne
    @JoinColumn(referencedColumnName = "id", name = "follower_user_id")
    private User follower;



//    public void setFollowing(User following){
//        following.getFollowing().add(this);
//        this.following = following;
//    }
//    public void  setFollower(User follower){
//        follower.getFollower().add(this);
//        this.follower = follower;
//    }



}
