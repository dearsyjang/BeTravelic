//package beTravelic.demo.domain.service;
//
//import beTravelic.demo.domain.dto.SurveySaveRequestDto;
//import beTravelic.demo.domain.dto.SurveySaveResponseDto;
//import beTravelic.demo.domain.entity.Survey;
//import beTravelic.demo.domain.entity.User;
//import beTravelic.demo.domain.repository.SurveyRepository;
//import beTravelic.demo.domain.repository.UserRepository;
//import lombok.RequiredArgsConstructor;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.stereotype.Service;
//
//@Service
//@RequiredArgsConstructor
//public class SurveyService {
//
//    @Autowired
//    public final SurveyRepository surveyRepository;
//    @Autowired
//    public final UserRepository userRepository;
//
//    public SurveySaveResponseDto surveySave(String id, SurveySaveRequestDto dto){
//
//        Survey survey;
//        survey = dto.toSurveyEntity();
//        User user = userRepository.findUserById(id).orElseThrow(() ->
//        new RuntimeException("일치하는 사용자 없음"));
//        survey.setUser(user);
//        surveyRepository.save(survey);
//        return new SurveySaveResponseDto(survey.getSurveySeq());
//    }
//}
