package beTravelic.demo.domain.service;


//import beTravelic.demo.domain.dto.SurveySaveRequestDto;
import beTravelic.demo.domain.dto.SurveySaveResponseDto;
import beTravelic.demo.domain.entity.*;
import beTravelic.demo.domain.repository.SurveyCategoryRepository;
import beTravelic.demo.domain.repository.SurveyKeywordRepository;
import beTravelic.demo.domain.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.validation.constraints.NotNull;
import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class SurveyService {

    private final UserRepository userRepository;
    private final SurveyCategoryRepository surveyCategoryRepository;
    private final SurveyKeywordRepository surveyKeywordRepository;

//    @Transactional
    public void surveySave(String id, List<Long> surveyCategory, List<String> surveyKeyword) {

        User user = userRepository.findUserById(id).orElseThrow(() ->
                new RuntimeException("일치하는 사용자가 없음"));
        for (int i = 0; i < surveyKeyword.size(); i++) {
            String temp = surveyKeyword.get(i);
            SurveyKeyword sk = new SurveyKeyword(user, temp);
            surveyKeywordRepository.save(sk);
        }
        for (int i = 0; i < surveyCategory.size(); i++) {
            Long temp = surveyCategory.get(i);
            SurveyCategory sc = new SurveyCategory(user, temp);
            surveyCategoryRepository.save(sc);
        }

//        return new SurveySaveResponseDto();
    }

}
