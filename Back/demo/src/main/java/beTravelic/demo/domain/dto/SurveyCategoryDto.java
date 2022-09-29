package beTravelic.demo.domain.dto;

import beTravelic.demo.domain.entity.Survey;
import lombok.Data;

@Data
public class SurveyCategoryDto {

    private Integer content;
    public Survey toEntity() {
        return Survey.builder().survey_category(this.content).build();
    }

}
