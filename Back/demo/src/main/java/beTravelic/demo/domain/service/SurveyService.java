//package beTravelic.demo.domain.service;

//import beTravelic.demo.domain.dto.SurveyCategoryDto;
//import beTravelic.demo.domain.dto.SurveySaveRequestDto;
//import beTravelic.demo.domain.dto.SurveySaveResponseDto;
//import beTravelic.demo.domain.entity.*;
//import beTravelic.demo.domain.repository.SurveyCategoryRepository;
//import beTravelic.demo.domain.repository.SurveyKeywordRepository;
//import beTravelic.demo.domain.repository.UserRepository;
//import lombok.RequiredArgsConstructor;
//import org.springframework.stereotype.Service;
//
//import java.util.List;
//
//@Service
//@RequiredArgsConstructor
//public class SurveyService {
//
//    private final UserRepository userRepository;
//    private final SurveyCategoryRepository surveyCategoryRepository;
//    private final SurveyKeywordRepository surveyKeywordRepository;
//
//    public SurveySaveResponseDto surveySave(String id, List<Long> surveyCategory, List<String> surveyKeyword){
//
//
//        User user = userRepository.findUserById(id).orElseThrow(() ->
//                new RuntimeException("일치하는 사용자가 없음"));
//        survey.setUser(user);
//        survey.setSurveycategory(dto.getCategory());
//        survey.setSurveykeyword(dto.getKeyword());
//        surveyRepository.save(survey);
//
//        return new SurveySaveResponseDto(survey.getId());
//    }
//
//}
