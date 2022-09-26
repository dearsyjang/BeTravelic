package beTravelic.demo.domain.entity;

import lombok.*;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

//  여행지
@Entity
@Getter
@AllArgsConstructor
@NoArgsConstructor
@ToString
@Table(name="place")
public class Place {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
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
    @Column(name = "addr")
    private String addr;

//    여행지 이름
    @Column(name = "title")
    private String title;

//    여행지 사진
//    사진의 주소 저장
    @Column(name = "image")
    private String image;

//    x좌표
    @Column(name = "mapx")
    private String mapx;

//    y좌표
    @Column(name = "mapy")
    private String mapy;

//    평점
    @Column(name = "score")
    private Long score;

    //    여행지id
//    추출하는 데이터에서의 id
    @Column(name = "content_id")
    private Long content_id;

//    개요
//    추출하는 데이터에서의 overview
    @Column
    private String overview;

    @OneToMany(mappedBy = "place")
    private List<Review> reviews = new ArrayList<>();

    @OneToMany(mappedBy = "place")
    private List<Bookmark> bookmarks = new ArrayList<>();

    @Builder(builderClassName = "ReviewPlaceId", builderMethodName = "ReviewPlaceId")
    public Place(Long place_id) {
        this.placeId = place_id;
    }
}
