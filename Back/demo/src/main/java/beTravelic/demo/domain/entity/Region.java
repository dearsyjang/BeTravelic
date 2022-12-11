package beTravelic.demo.domain.entity;

import lombok.*;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

//  지역 선택
@Entity
@Getter
@AllArgsConstructor
@NoArgsConstructor
@ToString
@Table(name="regions")
public class Region {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "region_id")
    private Long regionId;

//    지역코드
    @Column(name = "area_code")
    private Long area_code;

//    도/광역시
    @Column(name = "do_gwangyuksi")
    private String do_gwangyuksi;

    @OneToMany(mappedBy = "region")
    private List<Place> places = new ArrayList<>();

    @OneToMany(mappedBy = "region")
    private List<Review> reviews = new ArrayList<>();

    @OneToMany(mappedBy = "region")
    private List<Bookmark> bookmarks = new ArrayList<>();

    @Builder(builderClassName = "ReviewRegionId", builderMethodName = "ReviewRegionId")
    public Region(Long regionId) {
        this.regionId = regionId;
    }

}
