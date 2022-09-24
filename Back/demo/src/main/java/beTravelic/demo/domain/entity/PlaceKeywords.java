package beTravelic.demo.domain.entity;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

import javax.persistence.*;

//  장소 키워드
@Entity
@Getter
@NoArgsConstructor
@AllArgsConstructor
@ToString
@Table(name="place_keywords")
public class PlaceKeywords {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "place_keyword_id")
    private Long place_keyword_id;

//    유저
    @ManyToOne
    @JoinColumn(name = "place_id")
    private Place place;

//    여행지
    @OneToOne
    @JoinColumn(name = "keyword_id")
    private Keywords keywords;
}
