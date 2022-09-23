//package beTravelic.demo.domain.service;
//
//import beTravelic.demo.auth.repository.UserRepository;
//import beTravelic.demo.domain.dto.GetUserRegionReqDto;
//import beTravelic.demo.domain.dto.ReviewReqDto;
//import beTravelic.demo.domain.dto.ReviewResDto;
//import beTravelic.demo.domain.entity.Review;
//import beTravelic.demo.domain.entity.User;
//import beTravelic.demo.domain.repository.ReviewLikeRepository;
//import beTravelic.demo.domain.repository.ReviewRepository;
//import beTravelic.demo.domain.repository.UserRepository;
//import lombok.RequiredArgsConstructor;
//import lombok.extern.slf4j.Slf4j;
//import org.springframework.stereotype.Service;
//import org.springframework.transaction.annotation.Transactional;
//
//import java.util.Date;
//import java.util.List;
//
//@Slf4j
//@RequiredArgsConstructor
//@Service
//public class ReviewService {
//
//    private final UserRepository userRepository;
//
//    private final ReviewRepository reviewRepository;
//
//    private final ReviewLikeRepository reviewLikeRepository;
//
//    @Transactional
//    public Long post(ReviewReqDto reviewReqDto) throws Exception {
//        reviewReqDto.setCreatedAt(new Date());
//        Review reviewEntity = reviewRepository.save(reviewReqDto.toEntity());
//
//        if(reviewEntity != null) {
//            log.info(reviewEntity.getReviewId() + "번 여행기록 등록 완료!");
//            return reviewEntity.getReviewId();
//        } else {
//            log.info("여행기록 등록 실패");
//            throw new Exception("여행기록 등록 실패");
//        }
//
//    }
//
//
//    public List<ReviewResDto> findAllByUserAndRegion(GetUserRegionReqDto getUserRegionReqDto) {
//        User user = userRepository.findByUserId(getUserRegionReqDto.getUserId());
//        log.info("유저와 지역정보를 토대로 여행기록 조회");
//        return reviewRepository.findAllByUserAndRegion(user, getUserRegionReqDto.getRegionId());
//    }
//
//    @Transactional
//    public void put(ReviewReqDto reviewReqDto) throws Exception {
//        // 수정 날짜 대신 생성 날짜 변경
//        reviewReqDto.setCreatedAt(new Date());
//        Review reviewEntity = reviewRepository.save(reviewReqDto.toEntity());
//
//        if (reviewEntity == null) {
//            log.info("여행기록 수정 실패");
//            throw new Exception("여행기록 등록 실패");
//        }
//    }
//
//    public void deleteById(Long reviewId) throws Exception {
//        Review reviewEntity = reviewRepository.findById(reviewId).orElse(null);
//
//        if (reviewEntity == null) {
//            throw new Exception("해당하는 reviewID의 게시글이 없습니다.");
//        }
//
//        reviewRepository.deleteById(reviewId);
//        log.info(reviewEntity.getReviewId() + "번 여행기록이 삭제");
//    }
//}
