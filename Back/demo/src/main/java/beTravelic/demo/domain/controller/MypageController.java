//package beTravelic.demo.domain.controller;
//import beTravelic.demo.domain.service.MypageService;
//import beTravelic.demo.global.common.CommonResponse;
//import lombok.RequiredArgsConstructor;
//import org.springframework.http.HttpStatus;
//import org.springframework.http.ResponseEntity;
//import org.springframework.web.bind.annotation.*;
//
//import java.util.List;
//
//@RequiredArgsConstructor
//@RequestMapping("/mypage")
//@RestController
//public class MypageController {
//
//    private final MypageService mypageService;
//
//    @GetMapping("/mypicture/{userId}")
//    public ResponseEntity<CommonResponse> myPictureVeiw(@PathVariable("userId") Long userId){
//        return new ResponseEntity<>(CommonResponse.getSuccessResponse(mypageService.getMyPictures(userId)), HttpStatus.OK);
//    }
//
//
//
//
//
//
////    private final MypageService mypageService;
////    private final BookMarkService bookMarkService;
////    private final PictureService pictureService;
////    private final UserService userService;
//
////    @GetMapping("")
////    public ResponseEntity<?> getMypage() {
////        // 북마크 리스트
////        List<BookMarkDto> bookmarks = bookMarkService.findAllbyUser();
////        // 마이페이지 지도
////        List<PictureDto> pictures = pictureService.findAllbyUser();
////        // 유저 관련 정보
////        List<CustomUserDetailsService.UserDto> users = userService.findAllbyUser();
//
//    }
////
////    @PutMapping("/area-picture")
////    public ResponseEntity<?> updateAreaPicture(@RequestBody PictureDto pictureDto) {
////        // 지도 수정
////
////    }
////
////    @GetMapping("/travel-history?regionId={string}")
////    public ResponseEntity<?> getReview(){
////
////    }
////
////    @PostMapping("/travel-history")
////    public ResponseEntity<?> saveReview(ReviewDto reviewDto) {}
////
////    @PutMapping("/travel-history/{reviewId}")
////    public ResponseEntity<?> updateReview() {}
////
////    @DeleteMapping("/travel-history/{reviewId}")
////    public ResponseEntity<?> deleteReview(@PathVariable(name="reviewId") Long reviewId){
////
////    }
//
//
