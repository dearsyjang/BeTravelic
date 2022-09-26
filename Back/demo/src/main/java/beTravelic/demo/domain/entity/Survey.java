package beTravelic.demo.domain.entity;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import javax.print.attribute.standard.MediaSize;
@Entity
@Getter @Setter
@NoArgsConstructor
public class Survey {
    @Id @GeneratedValue
    @Column(name = "suervey_id")
    private Long id;

    @ManyToOne
    private User user;

    @OneToOne
    @JoinColumn(name = "keyword_id")
    private Keywords keywords;

    @OneToOne
    @JoinColumn(name = "category_id")
    private Categories categories;

    @Builder
    public Survey(User user, Categories categories, Keywords keywords){
        this.categories = categories;
        this.keywords = keywords;
        this.user = user;
    }
}
