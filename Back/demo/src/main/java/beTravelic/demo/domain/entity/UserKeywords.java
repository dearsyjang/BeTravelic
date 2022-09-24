package beTravelic.demo.domain.entity;

import lombok.Getter;

import javax.persistence.*;

@Entity
@Getter
public class UserKeywords {

    @Id @GeneratedValue
    @Column(name = "user_keyword_id")
    private Long user_keyword_id;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    @OneToOne
    @JoinColumn(name = "keyword_id")
    private Keywords keywords;
}
