//package beTravelic.demo.domain.controller;
//
//import beTravelic.demo.domain.dto.SurveySaveRequestDto;
//import beTravelic.demo.domain.service.SurveyService;
//import beTravelic.demo.global.common.CommonResponse;
//import io.swagger.annotations.ApiOperation;
//import lombok.RequiredArgsConstructor;
//import org.springframework.http.HttpStatus;
//import org.springframework.http.ResponseEntity;
//import org.springframework.validation.annotation.Validated;
//import org.springframework.web.bind.annotation.PostMapping;
//import org.springframework.web.bind.annotation.RequestBody;
//import org.springframework.web.bind.annotation.RequestMapping;
//import org.springframework.web.bind.annotation.RestController;
//
//import javax.servlet.http.HttpServletRequest;
//
//@RequiredArgsConstructor
//@RequestMapping("/survey")
//@RestController
//public class SurveyController {
//    private final SurveyService surveyService;
//
//    @PostMapping
//    @ApiOperation(value = "설문조사 저장", notes = "카테고리 id, 키워드 이름 입력")
//    public ResponseEntity<CommonResponse> surveySave(HttpServletRequest request, @RequestBody @Validated SurveySaveRequestDto dto){
//        String id = (String) request.getAttribute("id");
//        return new ResponseEntity<>(CommonResponse.getSuccessResponse(surveyService.surveySave(id, dto)), HttpStatus.OK);
//    }
//
//}
