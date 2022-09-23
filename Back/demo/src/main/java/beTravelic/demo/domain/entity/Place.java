package beTravelic.demo.domain.entity;

import lombok.*;

import javax.persistence.*;

//  여행지
@Builder
@Entity
@Getter
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class Place {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "place_id")
    private Long placeId;

//    카테고리
    @OneToOne
    @JoinColumn(name = "category_id")
    private Categories categories;

//    지역
    @ManyToOne
    @JoinColumn(name = "region_id")
    private Region region;

//    주소
    @Column
    private String addr;

//    여행지 이름
    @Column
    private String title;

//    여행지 사진
//    사진의 주소 저장
    @Column
    private String image;

//    x좌표
    @Column
    private String mapx;

//    y좌표
    @Column
    private String mapy;

//    평점
    @Column
    private Long score;

    //    여행지id
//    추출하는 데이터에서의 id
    @Column(name = "content_id")
    private Long contentId;

//    개요
//    추출하는 데이터에서의 overview
    @Column
    private String overview;
}
