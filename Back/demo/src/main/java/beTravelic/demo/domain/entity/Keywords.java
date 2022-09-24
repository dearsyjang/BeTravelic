package beTravelic.demo.domain.entity;


import lombok.Getter;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

@Entity
@Getter
public class Keywords {

    @Id @GeneratedValue
    @Column(name = "keyword_id")
    private Long keyword_id;

    @Column(name = "name")
    private String name;

}
