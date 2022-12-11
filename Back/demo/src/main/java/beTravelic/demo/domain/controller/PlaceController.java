package beTravelic.demo.domain.controller;

import beTravelic.demo.global.common.CommonResponse;
import beTravelic.demo.domain.service.PlaceService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;

@RestController
@RequestMapping("/places")
@RequiredArgsConstructor
public class PlaceController {
    private final PlaceService placeService;


    @GetMapping("/{place_id}")
    public ResponseEntity<CommonResponse> getPlace(HttpServletRequest request, @PathVariable("place_id") long place_id){
        return new ResponseEntity<>(CommonResponse.getSuccessResponse(placeService.getPlace(place_id)), HttpStatus.OK);
    }

}
