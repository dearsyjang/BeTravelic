package beTravelic.demo.domain.service;



import beTravelic.demo.domain.dto.GetUserRegionReqDto;
import beTravelic.demo.domain.dto.ReviewReqDto;
import beTravelic.demo.domain.dto.ReviewResDto;
import beTravelic.demo.domain.entity.Region;
import beTravelic.demo.domain.entity.Review;
import beTravelic.demo.domain.entity.User;
import beTravelic.demo.domain.repository.RegionRepository;
import beTravelic.demo.domain.repository.ReviewRepository;
import beTravelic.demo.domain.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Slf4j
@RequiredArgsConstructor
@Service
public class ReviewService {

    private final UserRepository userRepository;

    private final ReviewRepository reviewRepository;

//    private final ReviewLikeRepository reviewLikeRepository;

    private final RegionRepository regionRepository;

    @Transactional
    public Long post(ReviewReqDto reviewReqDto) throws Exception {
        reviewReqDto.setCreated_at(new Date());
        Review reviewEntity = reviewRepository.save(reviewReqDto.toEntity());

        if(reviewEntity != null) {
            log.info(reviewEntity.getReviewId() + "번 여행기록 등록 완료!");
            return reviewEntity.getReviewId();
        } else {
            log.info("여행기록 등록 실패");
            throw new Exception("여행기록 등록 실패");
        }

    }


    // 지역 게시물들 조회
    public List<ReviewResDto> findAllByRegion(Long regionId) {
        Region region = regionRepository.findById(regionId).orElseThrow(() -> new IllegalArgumentException("해당하는 지역 리뷰가 없습니다."));
        List<Review> reviews = region.getReviews();
        return reviews.stream().map(ReviewResDto::new).collect(Collectors.toList());
    }


    public List<ReviewResDto> findAllByUser(Long userId) {
        User user = userRepository.findById(userId).orElseThrow(() -> new IllegalArgumentException("해당하는 유저 리뷰가 없습니다."));
        List<Review> reviews = user.getReviews();
        return reviews.stream().map(ReviewResDto::new).collect(Collectors.toList());
    }


    // 유저의 지역 게시물들 조회
    public List<ReviewResDto> findAllByRegionAndUser(Long regionId, Long userId) {
        log.info("게시글 타입으로 게시글 조회하였습니다.");
        return reviewRepository.findAllByUserAndRegion(userId, regionId);
    }

    // 0928 비활성화
    // 단일 게시물 조회
//    public ReviewResDto getReview(long reviewId) {
//        Review review = reviewRepository.findReviewByReviewId(reviewId).orElseThrow(() ->
//                new RuntimeException("일치하는 여행지 없음"));
//        return ReviewResDto.of(review);
//    }
//

    @Transactional
    public void put(ReviewReqDto reviewReqDto) throws Exception {
        // 수정 날짜 대신 생성 날짜 변경
        reviewReqDto.setCreated_at(new Date());
        Review reviewEntity = reviewRepository.save(reviewReqDto.toEntity());

        if (reviewEntity == null) {
            log.info("여행기록 수정 실패");
            throw new Exception("여행기록 등록 실패");
        }
    }

    public void deleteById(Long reviewId) throws Exception {
        Review reviewEntity = reviewRepository.findById(reviewId).orElse(null);

        if (reviewEntity == null) {
            throw new Exception("해당하는 reviewID의 게시글이 없습니다.");
        }

        reviewRepository.deleteById(reviewId);
        log.info(reviewEntity.getReviewId() + "번 여행기록이 삭제");
    }


}
