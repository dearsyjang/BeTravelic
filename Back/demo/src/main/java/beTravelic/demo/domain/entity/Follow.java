//package beTravelic.demo.domain.entity;
//
//
//import lombok.AccessLevel;
//import lombok.Builder;
//import lombok.NoArgsConstructor;
//import lombok.Setter;
//
//import javax.persistence.*;
//
//@Entity
//@Setter
//@NoArgsConstructor(access = AccessLevel.PROTECTED)
//public class Follow {
//
//    @Id @GeneratedValue
//    @Column(name = "follow_id")
//    private Long follow_id;
//
//    @ManyToOne
//    @JoinColumn(name = "user_id")
//    private User following_user_id;
//
//    @ManyToOne
//    @JoinColumn(name = "user_id")
//    private User follower_user_id;

//    @Builder
//    public Follow(User userSeq, String follower, String following){
//        this.follower = follower;
//        this.following = following;
//        this.userSeq = userSeq;
//    }

//}
