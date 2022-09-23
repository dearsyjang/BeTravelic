package beTravelic.demo.domain.entity;

import lombok.*;

import javax.persistence.*;
@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class MypagePicture {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "pictureSeq")
    private Long pictureSeq;

    //  유저
    @ManyToOne
    @JoinColumn(name = "userSeq")
    private User userSeq;

    //  지역
    private String region;

    //  이미지는 서버에 저장
    //  여기에는 서버의 이미지 주소 저장
    //  대표 이미지
    @Column
    private String image;

    @Builder
    public MypagePicture(User userSeq, String region, String image){
        this.userSeq = userSeq;
        this.region  = region;
        this.image = image;
    }
}
