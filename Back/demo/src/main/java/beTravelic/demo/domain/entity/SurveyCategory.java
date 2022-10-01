package beTravelic.demo.domain.entity;

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



}
