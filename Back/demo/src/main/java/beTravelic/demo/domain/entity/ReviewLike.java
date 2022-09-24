//package beTravelic.demo.domain.entity;
//
//import lombok.AllArgsConstructor;
//import lombok.Getter;
//import lombok.NoArgsConstructor;
//import lombok.ToString;
//
//import javax.persistence.*;
//
////  좋아요
//@Entity
//@Getter
//@AllArgsConstructor
//@NoArgsConstructor
//@ToString
//public class ReviewLike {
//    @Id
//    @GeneratedValue(strategy = GenerationType.IDENTITY)
//    @Column(name = "like_id")
//    private Long id;
//
//    //    리뷰
//    @OneToOne
//    @JoinColumn(name = "review_id")
//    private Review review;
//
//    //    유저
//    @ManyToOne
//    @JoinColumn(name = "user_id")
//    private User user;
//
//
//}
