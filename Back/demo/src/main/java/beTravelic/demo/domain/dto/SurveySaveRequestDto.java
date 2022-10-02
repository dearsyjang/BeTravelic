package beTravelic.demo.domain.dto;

import beTravelic.demo.domain.entity.*;
import beTravelic.demo.domain.service.UserService;
import lombok.*;
import org.springframework.data.domain.PageRequest;

import java.util.ArrayList;
import java.util.List;


@Getter
@NoArgsConstructor
@AllArgsConstructor
public class SurveySaveRequestDto {

//    private User user;
    private ArrayList<String> keyword;
    private ArrayList<Long> category;


//    public SurveyKeyword toSurveKeywordEntity(){
//           return  SurveyKeyword.builder()
//                   .surveyKeyword(this.keyword)
//                    .user(this.user)
//                    .build();

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

