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

    private List<String> keyword;
    private List<Long> category;


//    public SurveyCategory toSurveyCategory(){
//        return SurveyCategory.builder()
//                .surveyCategory(this.category)
//    }
}
