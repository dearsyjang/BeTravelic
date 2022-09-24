package beTravelic.demo.domain.entity;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

import javax.persistence.*;

//  유저방문지역
@Entity
@Getter
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class UserPlace {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "visited_id")
    private Long visited_id;

    //    유저
    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    //    여행지
    @OneToOne
    @JoinColumn(name = "place_id")
    private Place place;
}
