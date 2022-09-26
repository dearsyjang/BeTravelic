package beTravelic.demo.domain.entity;

import lombok.Getter;

import javax.persistence.*;

@Entity
@Getter
public class Categories {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    @Column(name = "category_id")
    private Long category_id;

    @Column(name = "category_name")
    private String category_name;

    @Column(name = "category_type_id")
    private Integer category_type_id;
}
