package beTravelic.demo.domain.dto;

import beTravelic.demo.domain.entity.*;
import beTravelic.demo.domain.service.UserService;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;
import org.springframework.data.domain.PageRequest;

import java.util.ArrayList;
import java.util.List;

@Data
@Getter
public class SurveySaveRequestDto {

    private String keyword ;
    private Integer category;


    public Survey toSurveyEntity(){
        return Survey.builder()
                .survey_keyword(this.keyword)
                .survey_category(this.category)
                .build();
    }
}
