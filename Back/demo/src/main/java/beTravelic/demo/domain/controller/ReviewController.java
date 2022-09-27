package beTravelic.demo.domain.controller;

//import beTravelic.demo.domain.dto.GetUserRegionReqDto;
//import beTravelic.demo.domain.dto.ReviewDto;
import beTravelic.demo.domain.dto.GetUserRegionReqDto;
import beTravelic.demo.domain.dto.ReviewReqDto;
//import beTravelic.demo.domain.dto.ReviewResDto;
import beTravelic.demo.domain.dto.ReviewResDto;
import beTravelic.demo.domain.entity.Region;
import beTravelic.demo.domain.entity.Review;
import beTravelic.demo.domain.entity.User;
import beTravelic.demo.domain.service.ReviewService;
import beTravelic.demo.global.common.CommonResponse;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.util.List;

@RestController
@RequestMapping("/api/mypage")
@RequiredArgsConstructor
public class ReviewController {

    private final ReviewService reviewService;

    @ApiOperation(value = "여행기록 등록", notes = "성공 시 reviewId 반환, 실패시 status 반환")
    @PostMapping("/travel-history")
    public ResponseEntity<?> postReview(@RequestBody ReviewReqDto reviewReqDto) {
        try{
            Long reviewId = reviewService.post(reviewReqDto);
            return new ResponseEntity<>(reviewId, HttpStatus.valueOf(201));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }

    // 지역별 여행기록 조회
    @ApiOperation(value = "지역별 여행기록 조회", notes = "게시글 리스트 또는 null 반환")
    @GetMapping("/travel-history/region/{regionId}")
    public ResponseEntity<?> getReviewByRegion(HttpServletRequest request, @PathVariable("regionId") Long regionId){
        try {
            List<ReviewResDto> reviews = reviewService.findAllByRegion(regionId);
            return ResponseEntity.ok(reviews);
        } catch (IllegalStateException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }

    @ApiOperation(value = "유저의 지역별 여행기록 조회", notes = "게시글 리스트 또는 null 반환")
    @GetMapping("/travel-history/region/{regionId}/user/{user_id}")
//    public ResponseEntity<?> getReviewByRegionAndUser(@RequestBody GetUserRegionReqDto getUserTypeBoardReqDto) {
    public ResponseEntity<?> getReviewByRegionAndUser(@PathVariable("regionId")Long regionId, @PathVariable("user_id") Long user_id) {
        List<ReviewResDto> reviews = reviewService.findAllByRegionAndUser(regionId, user_id);
        return new ResponseEntity<>(reviews, HttpStatus.valueOf(200));
    }
//    @GetMapping("/travel-history/region/{regionId}/user/{userId}")
//    public ResponseEntity<?> getReviewByRegionAndUser(HttpServletRequest request, @PathVariable("regionId") Long regionId, @PathVariable("userId") Long userId){
////        List<Review> reviews = reviewService.findAllByRegionAndUser(regionId, userId);
////        return ResponseEntity.ok(reviews);
//        try {
//            List<ReviewResDto> reviews = reviewService.findAllByRegionAndUser(regionId, userId);
//            return ResponseEntity.ok(reviews);
//        } catch (IllegalStateException e) {
//            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
//        }
//    }



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
