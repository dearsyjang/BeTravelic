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

//    private String keyword ;
//    List<SurveyKeywordDto> keyword;
//    List<SurveyCategoryDto> category;
    private String keyword;
    private Integer category;


    public Survey toSurveyEntity(){
        return Survey.builder()
                .survey_keyword(this.keyword)
                .survey_category(this.category)
                .build();
    }
//    public List<Survey> toSurveyEntity(){
//        List<Survey> surveys = new ArrayList<>();
//        for(SurveyCategoryDto categoryDto : this.category){
//            surveys.add(categoryDto.toEntity());
//        }
//        for(SurveyKeywordDto keywordDto : this.keyword){
//            surveys.add(keywordDto.toEntity());
//        }
//        return surveys;
//    }
}
