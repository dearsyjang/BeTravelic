package beTravelic.demo.domain.dto;


import lombok.Data;

import java.util.List;

@Data
public class SurveyCategoryDto {

    private List<Long> content;
//    public Survey toEntity() {
//        return Survey.builder().survey_category(this.content).build();
//    }

}
