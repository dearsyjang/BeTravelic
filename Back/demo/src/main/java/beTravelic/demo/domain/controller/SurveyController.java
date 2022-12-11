package beTravelic.demo.domain.controller;

import beTravelic.demo.domain.dto.FollowSaveRequestDto;
//import beTravelic.demo.domain.dto.SurveySaveRequestDto;
import beTravelic.demo.domain.dto.SurveySaveRequestDto;
import beTravelic.demo.domain.service.SurveyService;
import beTravelic.demo.global.common.CommonResponse;
import beTravelic.demo.global.util.jwt.JwtProvider;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.util.List;

@RequiredArgsConstructor
@RequestMapping("/survey")
@RestController
public class SurveyController {

    private final SurveyService surveyService;
    private final JwtProvider jwtProvider;


    @PostMapping
    @ApiOperation(value = "설문조사 저장")
//    public ResponseEntity<CommonResponse> surveySave(HttpServletRequest request,
    public ResponseEntity<?> surveySave(HttpServletRequest request,
//                                                     @RequestParam("surveyCategory") List<Long> surveyCategory,
//                                                     @RequestParam("surveyKeyword") List<String> surveyKeyword) throws Exception {
                                        @RequestBody SurveySaveRequestDto dto) throws  Exception{
        String accessToken = request.getHeader(HttpHeaders.AUTHORIZATION).split(" ")[0];
        request.setAttribute("id", jwtProvider.getIdFromAccessToken(accessToken));
        String id = (String) request.getAttribute("id");
        surveyService.surveySave(id, dto.getCategories(), dto.getKeywords());
        return new ResponseEntity<>(HttpStatus.OK);
    }
//    @PostMapping
//    @ApiOperation(value = "설문조사 저장")
//    public ResponseEntity<CommonResponse> surveySave(HttpServletRequest request, @RequestBody SurveySaveRequestDto dto) throws Exception {
//        String accessToken = request.getHeader(HttpHeaders.AUTHORIZATION).split(" ")[0];
//        request.setAttribute("id", jwtProvider.getIdFromAccessToken(accessToken));
//        String id = (String) request.getAttribute("id");
//        return new ResponseEntity<>(CommonResponse.getSuccessResponse(surveyService.surveySave(id, dto)), HttpStatus.OK);
//    }
}
