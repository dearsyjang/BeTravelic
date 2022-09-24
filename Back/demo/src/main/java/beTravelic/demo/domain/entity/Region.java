package beTravelic.demo.domain.entity;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

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
    private Long region_id;

//    지역코드
    @Column(name = "area_code")
    private Long area_code;

//    도/광역시
    @Column(name = "do_gwangyuksi")
    private String do_gwangyuksi;

    @OneToMany(mappedBy = "region")
    private List<Place> places = new ArrayList<>();

}
