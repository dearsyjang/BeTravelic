package beTravelic.demo.domain.service;




import beTravelic.demo.domain.dto.ReviewLikeReqDto;
import beTravelic.demo.domain.dto.ReviewReqDto;
import beTravelic.demo.domain.dto.ReviewResDto;
import beTravelic.demo.domain.entity.*;
import beTravelic.demo.domain.repository.RegionRepository;
import beTravelic.demo.domain.repository.ReviewLikeRepository;
import beTravelic.demo.domain.repository.ReviewRepository;
import beTravelic.demo.domain.repository.UserRepository;
import com.google.auth.oauth2.GoogleCredentials;
import com.google.cloud.storage.*;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.ResourceUtils;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.FileInputStream;
import java.io.InputStream;
import java.util.*;
import java.util.stream.Collectors;

@Slf4j
@RequiredArgsConstructor
@Service
public class ReviewService {

    private final UserRepository userRepository;

    private final ReviewRepository reviewRepository;

    private final ReviewLikeRepository reviewLikeRepository;

    private final RegionRepository regionRepository;
    private final PictureService pictureService;
    @Value("${path.image:/image/}")
    private String IMAGE_PATH;
//    @Transactional
    public Long post(String id, ReviewReqDto reviewReqDto, MultipartFile reviewFile) throws Exception {
        File path = new File("");
        System.out.println(path.getAbsolutePath());

        InputStream keyFile = ResourceUtils.getURL("classpath:static/civil-forge-364402-29986bfb28c2.json").openStream();

        Storage storage = StorageOptions.newBuilder().setProjectId("BeTravelic")
                // Key 파일 수동 등록
                .setCredentials(GoogleCredentials.fromStream(keyFile))
                .build().getService();


        Picture picture = null;
        User user = userRepository.findUserById(id).orElseThrow(() ->
                new RuntimeException("일치하는 사용자 없음"));
        String fileName = UUID.randomUUID().toString();
        String contentType = reviewFile.getContentType();
        File file = null;
        if(contentType.contains("image/jpeg")){
            file = new File(IMAGE_PATH + fileName + ".jpg");
            picture = Picture.builder().fileName(fileName).realFileName(fileName + ".jpg").build();
        }else if(contentType.contains("image/png")){
            file = new File(IMAGE_PATH + fileName + ".png");
            picture = Picture.builder().fileName(fileName).realFileName(fileName + ".png").build();
        }else if(contentType.contains("image/gif")){
            file = new File(IMAGE_PATH + fileName + ".gif");
            picture = Picture.builder().fileName(fileName).realFileName(fileName + ".gif").build();
        }else{
            new RuntimeException("지원하는 사진 형식이 아닙니다");
        }

        File convertFile = pictureService.convertMultiPartToFile( reviewFile );

        BlobInfo blobInfo = storage.create(
                BlobInfo.newBuilder("be_travelic", picture.getRealFileName())
                        .setAcl(new ArrayList<>(Arrays.asList(Acl.of(Acl.User.ofAllUsers(), Acl.Role.READER))))
                        .build());

        Blob blob = storage.createFrom(blobInfo, new FileInputStream(convertFile));

        Review reviewDto = reviewReqDto.toEntity();
        reviewDto.setCreated_at(new Date());
//        reviewReqDto.setCreated_at(new Date());

//        reviewReqDto.setReviewLike(0);

        String reviewFileUrl = "https://storage.googleapis.com/be_travelic/"+picture.getRealFileName();
//        reviewReqDto.setFileName(picture.getFileName());
//        reviewReqDto.setRealFileName(reviewFileUrl);
//        Review reviewEntity = reviewRepository.save(reviewReqDto.toEntity());
        reviewDto.setRealFileName(reviewFileUrl);
        reviewDto.setFileName(picture.getFileName());
        reviewRepository.save(reviewDto);

        if(reviewDto != null) {
            log.info(reviewDto.getReviewId() + "번 여행기록 등록 완료!");
            return reviewDto.getReviewId();
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


    public List<ReviewResDto> findAllByUser(String id) {
        log.info("test" + id);
        User user = userRepository.findUserById(id).orElseThrow(() -> new IllegalArgumentException("해당하는 유저 리뷰가 없습니다."));
        List<Review> reviews = user.getReviews();
        return reviews.stream().map(ReviewResDto::new).collect(Collectors.toList());
    }


    // 유저의 지역 게시물들 조회
    public List<ReviewResDto> findAllByRegionAndUser(Long regionId, String id) {
        log.info("지역 유저 정보로 게시글 조회하였습니다.");
        return reviewRepository.findAllByUserAndRegion(id, regionId);
    }

    // 0928 비활성화
    // 단일 게시물 조회
//    public ReviewResDto getReview(long reviewId) {
//        Review review = reviewRepository.findReviewByReviewId(reviewId).orElseThrow(() ->
//                new RuntimeException("일치하는 여행지 없음"));
//        return ReviewResDto.of(review);
//    }
//

//    @Transactional
    public void put(ReviewReqDto reviewReqDto) throws Exception {
        // 수정 날짜 대신 생성 날짜 변경
        reviewReqDto.setCreated_at(new Date());
        Review reviewEntity = reviewRepository.save(reviewReqDto.toEntity());

        if (reviewEntity == null) {
            log.info("여행기록 수정 실패");
            throw new Exception("여행기록 등록 실패");
        }
    }

//    @Transactional
    public void deleteById(Long reviewId) throws Exception {
        Review reviewEntity = reviewRepository.findById(reviewId).orElse(null);

        if (reviewEntity == null) {
            throw new Exception("해당하는 reviewID의 게시글이 없습니다.");
        }

        reviewRepository.deleteById(reviewId);
        log.info(reviewEntity.getReviewId() + "번 여행기록이 삭제");
    }


    // 여행기록 좋아요
    @Transactional(rollbackFor = {Error.class})
    public void reviewLike(String id, Long reviewId) throws Exception {
        User user = userRepository.findUserById(id).orElseThrow(() -> new IllegalArgumentException("해당 유저가 없습니다."));
        log.info("user");
        Review review = reviewRepository.findById(reviewId).orElseThrow(() -> new IllegalArgumentException("해당 게시글이 없습니다."));
        log.info("review");
        ReviewLike reviewLike = reviewLikeRepository.findByUserAndReview(user, review);
        log.info("reviewLike");

        Review reviewEntity = null;
        // 해당 유저가 좋아요를 한 리뷰라면 OFF
        if (reviewLike != null) {
            reviewLikeRepository.delete(reviewLike);

            // 좋아요 감소
            reviewEntity = reviewRepository.save(Review.builder()
                    .user(user)
                    .reviewId(review.getReviewId())
                    .place(review.getPlace())
                    .region(review.getRegion())
                    .contents(review.getContents())
                    .fileName(review.getFileName())
                    .realFileName(review.getRealFileName())
                    .score(review.getScore())
                    .created_at(review.getCreated_at())
                    .visited_at(review.getVisited_at())
                    .reviewLike(review.getReviewLike() - 1)
                    .build());
            log.info(reviewEntity.getReviewId() + "번 게시글 좋아요 취소");
        }

        // 해당 유저가 좋아요 안한 상태라면 ON
        else {
            reviewLike = ReviewLike.builder()
                    .user(user)
                    .review(review)
                    .build();

            reviewLikeRepository.save(reviewLike);

            // 좋아요 증가
            reviewEntity = reviewRepository.save(Review.builder()
                    .user(user)
                    .reviewId(review.getReviewId())
                    .place(review.getPlace())
                    .region(review.getRegion())
                    .contents(review.getContents())
                    .fileName(review.getFileName())
                    .realFileName(review.getRealFileName())
                    .score(review.getScore())
                    .created_at(review.getCreated_at())
                    .visited_at(review.getVisited_at())
                    .reviewLike(review.getReviewLike() + 1)
                    .build());
            log.info(reviewEntity.getReviewId() + "번 게시글 좋아요");
        }

        // 게시글 좋아요 수 반영 실패
        if (reviewEntity == null) {
            log.info("게시글 좋아요 수 반영 실패");
            throw new Exception("게시글 좋아요 수 반영 실패");
        }
    }

    public ReviewLikeReqDto saveReviewLike(String id, Long reviewId) {
        ReviewLike reviewLike = new ReviewLike();
        User user = userRepository.findUserById(id).orElseThrow(() ->
                new IllegalArgumentException("유저 없음"));
        Review review = reviewRepository.findReviewByReviewId(reviewId).orElseThrow(() ->
                new IllegalArgumentException("리뷰 없음"));
        reviewLike.setReview(review);
        reviewLike.setUser(user);
        reviewLikeRepository.save(reviewLike);
        return new ReviewLikeReqDto(reviewLike.getLike_id());
    }

    public void deleteReviewLike(String id, Long reviewId) throws Exception {
        User user = userRepository.findUserById(id).orElseThrow(() -> new IllegalArgumentException("해당 유저 없음"));
        Review review = reviewRepository.findReviewByReviewId(reviewId).orElseThrow(() -> new IllegalArgumentException("해당 리뷰 없음"));
        ReviewLike reviewLike = reviewLikeRepository.findByUserAndReview(user, review);

        if (reviewLike == null) {
            throw new Exception("해당 좋아요가 없습니다.");
        }

        reviewLikeRepository.delete(reviewLike);

    }

    public boolean isLikeReview(String id, Long review_id) {
        ReviewLike reviewLike = reviewLikeRepository.findByIdAndReview_id(id, review_id);
        if (reviewLike == null) {
            log.info("좋아요 안 누른 게시글입니다.");
            return false;
        } else {
            log.info("좋아요 누른 게시글입니다.");
            return true;
        }
    }

}
