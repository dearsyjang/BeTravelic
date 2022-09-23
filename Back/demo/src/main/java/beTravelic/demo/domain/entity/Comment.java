package beTravelic.demo.domain.entity;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

import javax.persistence.*;
import java.time.LocalDate;

//  라뷰 댓글
@Entity
@Getter
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class Comment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "comment_id")
    private Long commentId;

//    리뷰
    @ManyToOne
    @JoinColumn(name = "review_id")
    private Review review;

//    유저
//    ERD보고 OneToOne했긴 하지만 ManyToOne이 아닐까?
    @OneToOne
    @JoinColumn(name = "user_id")
    private User user;

//    내용
    @Column
    private String contents;

//    작성일
    @Temporal(TemporalType.TIMESTAMP)
    @Column(name = "created_at", nullable = false, columnDefinition = "timestamp")
    private LocalDate createdAt;
}
