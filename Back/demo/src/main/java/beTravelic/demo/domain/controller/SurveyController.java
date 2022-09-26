package beTravelic.demo.domain.controller;

import beTravelic.demo.domain.dto.FollowSaveRequestDto;
import beTravelic.demo.domain.dto.SurveySaveRequestDto;
import beTravelic.demo.domain.service.SurveyService;
import beTravelic.demo.global.common.CommonResponse;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;

@RequiredArgsConstructor
@RequestMapping("/survey")
@RestController
public class SurveyController {

    private final SurveyService surveyService;

    @PostMapping
    @ApiOperation(value = "설문조사 저장")
    public ResponseEntity<CommonResponse> surveySave(@RequestParam("id") String id, @RequestBody SurveySaveRequestDto dto){
        return new ResponseEntity<>(CommonResponse.getSuccessResponse(surveyService.surveySave(id, dto)), HttpStatus.OK);
    }
}
