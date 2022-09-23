package beTravelic.demo.domain.controller;

import beTravelic.demo.domain.dto.GetUserRegionReqDto;
import beTravelic.demo.domain.dto.ReviewDto;
import beTravelic.demo.domain.dto.ReviewReqDto;
import beTravelic.demo.domain.dto.ReviewResDto;
import beTravelic.demo.domain.service.ReviewService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/mypage")
@RequiredArgsConstructor
public class ReviewController {

    private final ReviewService reviewService;

    @PostMapping("/travel-history")
    public ResponseEntity<?> postReview(@RequestBody ReviewReqDto reviewReqDto) {
        try{
            Long reviewId = reviewService.post(reviewReqDto);
            return new ResponseEntity<>(reviewId, HttpStatus.valueOf(200));
        } catch (Exception e) {
            return new ResponseEntity<>(false, HttpStatus.valueOf(500));
        }
    }

    @GetMapping("/travel-history?regionId={string}")
    public ResponseEntity<?> getReviewByRegion(@RequestBody GetUserRegionReqDto getUserRegionReqDto){
        List<ReviewResDto> reviews = reviewService.findAllByUserAndRegion(getUserRegionReqDto);
        return new ResponseEntity<>(reviews, HttpStatus.valueOf(200));
    }



    @PutMapping("/travel-history/{reviewId}")
    public ResponseEntity<?> putReview(@RequestBody ReviewReqDto reviewReqDto) {
        try {
            reviewService.put(reviewReqDto);
            return new ResponseEntity<>(true, HttpStatus.valueOf(200));
        } catch (Exception e) {
            return new ResponseEntity<>(false, HttpStatus.valueOf(500));
        }
    }

    @DeleteMapping("/travel-history/{reviewId}")
    public ResponseEntity<?> deleteReview(@PathVariable(name="reviewId") Long reviewId){
        try {
            reviewService.deleteById(reviewId);
            return new ResponseEntity<>(true, HttpStatus.valueOf(200));
        } catch (Exception e) {
            return new ResponseEntity<>(false, HttpStatus.valueOf(400));
        }
    }
}
