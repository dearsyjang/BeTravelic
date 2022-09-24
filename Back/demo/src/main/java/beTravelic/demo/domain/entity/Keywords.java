package beTravelic.demo.domain.entity;


import lombok.Getter;

import javax.persistence.*;

@Entity
@Getter
@Table(name="keywords")
public class Keywords {

    @Id @GeneratedValue
    @Column(name = "keyword_id")
    private Long keyword_id;

    @Column(name = "name")
    private String name;

}
