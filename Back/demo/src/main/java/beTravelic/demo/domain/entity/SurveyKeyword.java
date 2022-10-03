package beTravelic.demo.domain.entity;

import lombok.*;

import javax.persistence.*;
import java.util.Date;


@Entity
@Getter
@Setter
@NoArgsConstructor
@ToString
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


    @Builder
    public SurveyKeyword (User user, String surveyKeyword){
        this.user = user;
        this.surveyKeyword = surveyKeyword;
    }
}
