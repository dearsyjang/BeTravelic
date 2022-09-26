package beTravelic.demo.domain.entity;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.security.core.authority.mapping.NullAuthoritiesMapper;

import javax.persistence.*;

@Entity
@Getter @Setter
@NoArgsConstructor
@Table(name="user_categories")
public class UserCategories {

    @Id @GeneratedValue
    @Column(name = "user_categories_id")
    private Long user_categories_id;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    @Column(name = "category_num")
    private Integer category_num;

    @OneToOne
    @JoinColumn(name = "category_type_id")
    private Categories categories;

    @Builder
    public UserCategories(User user, Integer category_num){
        this.category_num = category_num;
        this.user = user;
    }




}
