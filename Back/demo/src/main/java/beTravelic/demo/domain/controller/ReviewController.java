package beTravelic.demo.domain.controller;

//import beTravelic.demo.domain.dto.GetUserRegionReqDto;
//import beTravelic.demo.domain.dto.ReviewDto;
import beTravelic.demo.domain.dto.PlacesByRegionDto;
import beTravelic.demo.domain.dto.ReviewLikeReqDto;
import beTravelic.demo.domain.dto.ReviewReqDto;
//import beTravelic.demo.domain.dto.ReviewResDto;
import beTravelic.demo.domain.dto.ReviewResDto;
import beTravelic.demo.domain.service.PlaceService;
import beTravelic.demo.domain.service.ReviewService;
import beTravelic.demo.global.common.CommonResponse;
import beTravelic.demo.global.util.jwt.JwtProvider;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletRequest;
import java.util.List;

@RestController
@RequestMapping
@RequiredArgsConstructor
public class ReviewController {

    private final ReviewService reviewService;
    private final JwtProvider jwtProvider;

    private final PlaceService placeService;

    @ApiOperation(value = "여행기록 등록", notes = "성공 시 reviewId 반환, 실패시 status 반환")
    @PostMapping("/feed/travel-review")
    public ResponseEntity<?> postReview(HttpServletRequest request, ReviewReqDto reviewReqDto, MultipartFile file) throws Exception {
        String accessToken = request.getHeader(HttpHeaders.AUTHORIZATION).split(" ")[0];
        request.setAttribute("id", jwtProvider.getIdFromAccessToken(accessToken));
        String id = (String) request.getAttribute("id");
        try{
            Long reviewId = reviewService.post(id, reviewReqDto, file);
            return new ResponseEntity<>(reviewId, HttpStatus.valueOf(201));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }

    @ApiOperation(value = "지역별 장소 리스트", notes = "")
    @GetMapping("/feed/travel-review")
    public ResponseEntity<?> getPlacesByRegion(@RequestParam("regionId") Long regionId) {
        List<PlacesByRegionDto> places = placeService.findPlacesByRegion(regionId);
        return new ResponseEntity<>(places, HttpStatus.valueOf(200));
    }

    // 0928 비활성화
//    @ApiOperation(value = "지역별 여행기록 조회", notes = "게시글 리스트 또는 null 반환")
//    @GetMapping("/travel-history/region/{regionId}")
//    public ResponseEntity<?> getReviewByRegion(HttpServletRequest request, @PathVariable("regionId") Long regionId){
//        try {
//            List<ReviewResDto> reviews = reviewService.findAllByRegion(regionId);
//            return ResponseEntity.ok(reviews);
//        } catch (IllegalStateException e) {
//            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
//        }
//    }


    @ApiOperation(value = "유저별 여행기록 조회", notes = "게시글 리스트 또는 null 반환")
    @GetMapping("/mypage/travel-history/user")
    public ResponseEntity<?> getReviewByUser(HttpServletRequest request) throws Exception {
        String accessToken = request.getHeader(HttpHeaders.AUTHORIZATION).split(" ")[0];
        request.setAttribute("id", jwtProvider.getIdFromAccessToken(accessToken));
        String id = (String) request.getAttribute("id");
        try {
            List<ReviewResDto> reviews = reviewService.findAllByUser(id);
            return ResponseEntity.ok(reviews);
        } catch (IllegalStateException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }


    @ApiOperation(value = "유저의 지역별 여행기록 조회", notes = "게시글 리스트 또는 null 반환")
    @GetMapping("/mypage/travel-history/region/{region_id}/user")
    public ResponseEntity<?> getReviewByRegionAndUser(HttpServletRequest request, @PathVariable("region_id")Long region_id) throws Exception {
        String accessToken = request.getHeader(HttpHeaders.AUTHORIZATION).split(" ")[0];
        request.setAttribute("id", jwtProvider.getIdFromAccessToken(accessToken));
        String id = (String) request.getAttribute("id");
        List<ReviewResDto> reviews = reviewService.findAllByRegionAndUser(region_id, id);
        return new ResponseEntity<>(reviews, HttpStatus.valueOf(200));
    }


    @ApiOperation(value = "여행기록 수정", notes = "수정 시 true, 실패 시 false 반환")
    @PutMapping("/mypage/travel-history/{review_id}")
    public ResponseEntity<?> putReview(HttpServletRequest request, @PathVariable("review_id") Long review_id, ReviewReqDto reviewReqDto, MultipartFile file) throws Exception {
        String accessToken = request.getHeader(HttpHeaders.AUTHORIZATION).split(" ")[0];
        request.setAttribute("id", jwtProvider.getIdFromAccessToken(accessToken));
        String id = (String) request.getAttribute("id");
        try {
            reviewService.put(id, reviewReqDto, file, review_id);
            return new ResponseEntity<>(true, HttpStatus.valueOf(200));
        } catch (Exception e) {
            return new ResponseEntity<>(false, HttpStatus.valueOf(500));
        }
    }


    @ApiOperation(value = "여행기록 삭제", notes = "수정 시 true, 실패 시 false 반환")
    @DeleteMapping("/mypage/travel-history/{review_id}")
    public ResponseEntity<?> deleteReview(@PathVariable(name="review_id") Long review_id){
        try {
            reviewService.deleteById(review_id);
            return new ResponseEntity<>(true, HttpStatus.valueOf(200));
        } catch (Exception e) {
            return new ResponseEntity<>(false, HttpStatus.valueOf(400));
        }
    }


    @ApiOperation(value = "여행기록 좋아요", notes = "")
    @PostMapping("/feed/like")
    public ResponseEntity<?> likeReview(HttpServletRequest request, @RequestParam("review_id")Long review_id) throws Exception {
        String accessToken = request.getHeader(HttpHeaders.AUTHORIZATION).split(" ")[0];
        request.setAttribute("id", jwtProvider.getIdFromAccessToken(accessToken));
        String id = (String) request.getAttribute("id");
        try {
            reviewService.reviewLike(id, review_id);
            return new ResponseEntity<>(true, HttpStatus.valueOf(201));
        } catch (Exception e) {
            return new ResponseEntity<>(false, HttpStatus.valueOf(500));
        }
    }


    @ApiOperation(value = "좋아요 상태 여부 확인", notes = "좋아요한 상태면 true, 아닌 경우 false")
    @GetMapping("/like/{review_id}")
    public ResponseEntity<?> isLike(HttpServletRequest request, @PathVariable Long review_id) throws Exception {
        String accessToken = request.getHeader(HttpHeaders.AUTHORIZATION).split(" ")[0];
        request.setAttribute("id", jwtProvider.getIdFromAccessToken(accessToken));
        String id = (String) request.getAttribute("id");
        boolean state = reviewService.isLikeReview(id, review_id);
        return new ResponseEntity<>(state, HttpStatus.valueOf(200));
    }
//    @ApiOperation(value = "여행기록 좋아요", notes = "")
//    @PostMapping("/feed/travel-history/like/{review_id}")
//    public ResponseEntity<CommonResponse> likeReview(HttpServletRequest request, @RequestParam("review_id")Long review_id) throws Exception {
//        String accessToken = request.getHeader(HttpHeaders.AUTHORIZATION).split(" ")[0];
//        request.setAttribute("id", jwtProvider.getIdFromAccessToken(accessToken));
//        String id = (String) request.getAttribute("id");
//        reviewService.saveReviewLike(id, review_id);
//        return null;
//    }

//    @ApiOperation(value = "여행기록 좋아요 취소", notes="")
//    @DeleteMapping("feed/travel-history/like/{review_id}")
//    public ResponseEntity<?> deleteReviewLike(HttpServletRequest request ,@RequestParam(name="review_id") Long review_id) throws Exception {
//        String accessToken = request.getHeader(HttpHeaders.AUTHORIZATION).split(" ")[0];
//        request.setAttribute("id", jwtProvider.getIdFromAccessToken(accessToken));
//        String id = (String) request.getAttribute("id");
//        try {
//            reviewService.deleteReviewLike(id, review_id);
//            return new ResponseEntity<>(true, HttpStatus.valueOf(200));
//        }   catch (Exception e) {
//            return new ResponseEntity<>((false), HttpStatus.valueOf(400));
//        }
//    }

}
