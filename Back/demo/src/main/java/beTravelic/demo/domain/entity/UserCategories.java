package beTravelic.demo.domain.entity;

import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.security.core.authority.mapping.NullAuthoritiesMapper;

import javax.persistence.*;

@Entity
@Getter
@NoArgsConstructor
public class UserCategories {

    @Id @GeneratedValue
    @Column(name = "user_categories_id")
    private Long user_categories_id;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    @OneToOne
    @JoinColumn(name = "category_id")
    private Categories categories;



}
