package beTravelic.demo.domain.entity;

import lombok.Getter;

import javax.persistence.*;

@Entity
@Getter
public class Survey {

    @Id
    @GeneratedValue
    @Column(name = "surveySep")
    private long surveySep;

    @OneToOne
    @JoinColumn(name = "userSeq")
    private User userSeq;

    private Integer categoryId;

    private String keywordName;
}
