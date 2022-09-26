package beTravelic.demo.domain.controller;

import beTravelic.demo.domain.dto.FollowSaveRequestDto;
import beTravelic.demo.domain.service.FollowService;
import beTravelic.demo.global.common.CommonResponse;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
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

    @PostMapping
    @ApiOperation(value = "팔로잉 신청", notes = "current_user_id, follower_id 입력")
    public ResponseEntity<CommonResponse> followSave(@RequestParam("id")String id, String follower_id){
        followService.followSave(id, follower_id);
        return null;
    }

    @DeleteMapping
    @ApiOperation(value = "팔로우 취소", notes = "current_user_id, follower_id 입력")
    public ResponseEntity<CommonResponse> followDelete(@RequestParam("id")String id, String follower_id){
        followService.followDelete(id, follower_id);
        return null;
    }

    @GetMapping("/followingList")
    @ApiOperation(value = "팔로잉 리스트")
    public ResponseEntity<CommonResponse> followingList(@RequestParam("id") String id){
        return new ResponseEntity<>(CommonResponse.getSuccessResponse(followService.followingList(id)), HttpStatus.OK);
    }

    @GetMapping("/followerList")
    @ApiOperation(value = "팔로워 리스트")
    public ResponseEntity<CommonResponse> followerList(@RequestParam("id") String id){
        return new ResponseEntity<>(CommonResponse.getSuccessResponse(followService.followerList(id)), HttpStatus.OK);
    }
}
