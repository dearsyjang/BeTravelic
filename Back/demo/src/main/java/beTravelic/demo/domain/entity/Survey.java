package beTravelic.demo.domain.entity;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import javax.print.attribute.standard.MediaSize;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter @Setter
@NoArgsConstructor
public class Survey {
    @Id @GeneratedValue
    @Column(name = "survey_id")
    private Long id;

    @OneToOne
    @JoinColumn(name = "user_id")
    private User user;
    private String survey_keyword ;
    private Integer survey_category;

    @Builder
    public Survey(User user, String survey_keyword, Integer survey_category){
        this.survey_keyword = survey_keyword;
        this.survey_category = survey_category;
        this.user = user;
    }
}
