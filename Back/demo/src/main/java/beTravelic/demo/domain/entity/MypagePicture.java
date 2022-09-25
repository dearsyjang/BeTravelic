package beTravelic.demo.domain.entity;

import lombok.*;

import javax.persistence.*;
@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
@Table(name="picture")
public class MypagePicture {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "picture_id")
    private Long picture_id;

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
    @Column(name="image")
    private String image;

    @Builder
    public MypagePicture(User user, Region region, String image){
        this.user = user;
        this.region  = region;
        this.image = image;
    }
}
