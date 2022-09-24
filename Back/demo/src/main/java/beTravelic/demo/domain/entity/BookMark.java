package beTravelic.demo.domain.entity;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

import javax.persistence.*;

//  북마크
@Entity
@Getter
@ToString
@AllArgsConstructor
@NoArgsConstructor
@Table(name="bookmark")
public class BookMark {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "bookmark_id")
    private Long bookmark_id;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user_id;

    @OneToOne
    @JoinColumn(name = "place_id")
    private Place place_id;
}
