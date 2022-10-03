package beTravelic.demo.domain.entity;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Getter
@Setter
@NoArgsConstructor
@Table(name="survey_category")
public class SurveyCategory {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    @Column(name = "survey_id")
    private Long surveyId;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    @Column(name = "survey_category")
    private Long surveyCategory;

    @Builder
    public SurveyCategory(Long surveyCategory){
        this.surveyCategory = surveyCategory;
    }

    @Builder
    public SurveyCategory (User user, Long surveyCategory){
        this.user = user;
        this.surveyCategory = surveyCategory;
    }
}
