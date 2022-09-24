package beTravelic.demo.domain.entity;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

import javax.persistence.*;

//  지역 선택
@Entity
@Getter
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class Region {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "regionSeq")
    private Long regionSeq;

//    지역코드
    @Column
    private Long area_code;

//    도/광역시
    @Column
    private String do_gwangyuksi;

}
