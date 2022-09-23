package beTravelic.demo.domain.entity;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

import javax.persistence.*;

//  마이페이지 대표 사진
@Entity
@Getter
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class Picture {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "picture_id")
    private Long id;

    //  유저
    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    //  지역
    @OneToOne
    @JoinColumn(name = "region_id")
    private Region region;

    //  이미지는 서버에 저장
    //  여기에는 서버의 이미지 주소 저장
    //  대표 이미지
    @Column
    private String image;
}
