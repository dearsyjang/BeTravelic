package beTravelic.demo.domain.entity;

import lombok.*;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

//  마이페이지 여행 기록

@Entity
@Getter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@ToString
@Table(name="review")
public class Review {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    @Column(name = "review_id")
    private Long reviewId;

    //    여행지
    @ManyToOne
    @JoinColumn(name = "place_id")
    private Place place;

    //    유저
    @Setter
    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    //  지역
    @ManyToOne
    @JoinColumn(name = "region_id")
    private Region region;

    //    게시글 내용
    @Column(name = "contents")
    private String contents;


    //    평점
    @Column(name = "score")
    private Long score;

    //    게시글 작성일
    @Temporal(TemporalType.TIMESTAMP)
    @Setter
    @Column(name = "created_at", nullable = false, updatable = false)
    private Date created_at;

    //    여행지 방문일
    @Column(name = "visited_at")
    private String visited_at;

    //  게시글 좋아요
    @Setter
    @Column(name = "reviewLike")
    private int reviewLike;

    // file_name
    @Setter
    @Column(name = "file_name")
    private String fileName;

    // real_file_name
    @Setter
    @Column(name = "real_file_name")
    private String realFileName;


    //    Comment와 연결
    @OneToMany(mappedBy = "review")
    private List<Comment> comments = new ArrayList<>();

}
