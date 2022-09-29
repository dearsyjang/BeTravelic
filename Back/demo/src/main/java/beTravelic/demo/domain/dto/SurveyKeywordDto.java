package beTravelic.demo.domain.dto;

import beTravelic.demo.domain.entity.Survey;
import com.nimbusds.jose.crypto.impl.PRFParams;
import lombok.Data;

@Data
public class SurveyKeywordDto {

    private String content;

    public Survey toEntity(){
        return Survey.builder().survey_keyword(this.content).build();
    }
}
