package beTravelic.demo.domain.controller;

import beTravelic.demo.domain.dto.FollowSaveRequestDto;
import beTravelic.demo.domain.service.FollowService;
import beTravelic.demo.global.common.CommonResponse;
import beTravelic.demo.global.util.jwt.JwtProvider;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;

@RequiredArgsConstructor
@RequestMapping("/follow")
@RestController
public class FollowController {

    private final FollowService followService;
    private final JwtProvider jwtProvider;

    @PostMapping
    @ApiOperation(value = "팔로잉 신청", notes = "current_user_id, follower_id 입력")
    public ResponseEntity<CommonResponse> followSave(HttpServletRequest request, @RequestParam("follower_id")Long follower_id) throws Exception {
        String accessToken = request.getHeader(HttpHeaders.AUTHORIZATION).split(" ")[0];
        request.setAttribute("id", jwtProvider.getIdFromAccessToken(accessToken));
        String id = (String) request.getAttribute("id");
        followService.followSave(id, follower_id);
        return null;
    }

    @DeleteMapping
    @ApiOperation(value = "팔로우 취소", notes = "current_user_id, follower_id 입력")
    public ResponseEntity<?> followDelete(HttpServletRequest request, @RequestParam("follower_id") Long follower_id) throws Exception {
        String accessToken = request.getHeader(HttpHeaders.AUTHORIZATION).split(" ")[0];
        request.setAttribute("id", jwtProvider.getIdFromAccessToken(accessToken));
        String id = (String) request.getAttribute("id");
        try{
            followService.followDelete(id, follower_id);
            return new ResponseEntity<>(true, HttpStatus.valueOf(200));
        } catch (Exception e) {
            return new ResponseEntity<>("팔로우 하지 않은 유저입니다.", HttpStatus.valueOf(400));
        }
    }

    @GetMapping("/followingList")
    @ApiOperation(value = "팔로잉 리스트")
    public ResponseEntity<CommonResponse> followingList(@RequestParam("user_id") Long user_id) throws Exception {
//        String accessToken = request.getHeader(HttpHeaders.AUTHORIZATION).split(" ")[0];
//        request.setAttribute("id", jwtProvider.getIdFromAccessToken(accessToken));
//        String id = (String) request.getAttribute("id");
        return new ResponseEntity<>(CommonResponse.getSuccessResponse(followService.followingList(user_id)), HttpStatus.OK);
    }

    @GetMapping("/followerList")
    @ApiOperation(value = "팔로워 리스트")
    public ResponseEntity<CommonResponse> followerList(@RequestParam("user_id") Long user_id) throws Exception {
//        String accessToken = request.getHeader(HttpHeaders.AUTHORIZATION).split(" ")[0];
//        request.setAttribute("id", jwtProvider.getIdFromAccessToken(accessToken));
//        String id = (String) request.getAttribute("id");
        return new ResponseEntity<>(CommonResponse.getSuccessResponse(followService.followerList(user_id)), HttpStatus.OK);
    }

    @ApiOperation(value = "팔로우 상태 여부 확인", notes = "좋아요한 상태면 true, 아닌 경우 false")
    @GetMapping("/{user_id}")
    public ResponseEntity<?> isLike(HttpServletRequest request, @PathVariable Long user_id) throws Exception {
        String accessToken = request.getHeader(HttpHeaders.AUTHORIZATION).split(" ")[0];
        request.setAttribute("id", jwtProvider.getIdFromAccessToken(accessToken));
        String id = (String) request.getAttribute("id");
        boolean state = followService.isFollowing(id, user_id);
        return new ResponseEntity<>(state, HttpStatus.valueOf(200));
    }
}
