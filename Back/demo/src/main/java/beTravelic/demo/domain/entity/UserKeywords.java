package beTravelic.demo.domain.entity;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Table(name="user_keywords")
@Getter @Setter
@NoArgsConstructor
public class UserKeywords {

    @Id @GeneratedValue
    @Column(name = "user_keyword_id")
    private Long user_keyword_id;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    private String keyword_name;
    @OneToOne
    @JoinColumn(name = "name")
    private Keywords keywords;

    @Builder
    public UserKeywords(User user, String keyword_name) {
        this.keyword_name = keyword_name;
        this.user = user;
    }
}
