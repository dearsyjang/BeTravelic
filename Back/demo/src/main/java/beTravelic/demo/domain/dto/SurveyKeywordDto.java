package beTravelic.demo.domain.dto;


import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.util.List;

@Getter
@Setter
@ToString
public class SurveyKeywordDto {

    private List<String> content;

//    public SurveyKeyword toEntity(){
//        return SurveyKeyword.builder().survey_keyword(this.content).build();
//    }
}
