package beTravelic.demo.domain.entity;

import lombok.*;


import javax.persistence.*;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Date;

//  라뷰 댓글
@Entity
@Getter @Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
@Table(name="comment")
public class Comment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "comment_id")
    private Long comment_id;

//    리뷰
    @ManyToOne
    @JoinColumn(name = "review_id")
    private Review review;

//    유저
//    ERD보고 OneToOne했긴 하지만 ManyToOne이 아닐까?
    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

//    내용
    @Column
    private String contents;

//    작성일
    @Temporal(TemporalType.TIMESTAMP)
    @Column(name = "created_at", nullable = false, columnDefinition = "timestamp")
    private Date created_at;

    @Builder
    public Comment (Date created_at, String contents){
        this.created_at = created_at;
        this.contents = contents;
    }
    public void update(Date date, String contents){
        this.created_at=date;
        this.contents=contents;
    }
}
