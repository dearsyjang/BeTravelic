package beTravelic.demo.domain.entity;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;


@Entity
@Getter
@Setter
@NoArgsConstructor
@Table(name="survey_keyword")
public class SurveyKeyword {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    @Column(name = "keyword_id")
    private Long keywordId;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    @Column(name = "survey_keyword")
    private String surveyKeyword;


}
