package beTravelic.demo.auth.controller;

import beTravelic.demo.auth.dto.UserInfoResponseDto;
import beTravelic.demo.auth.dto.UserRequestDto;
import beTravelic.demo.auth.service.UserService;
import beTravelic.demo.domain.User;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api")
@Api(tags = "회원관리기능")
public class UserController {

    private final UserService userService;

    // 자신의 회원 정보 조회
    @GetMapping("/user/me")
    @ApiOperation(value = "자신의 정보조회", notes = "Token으로 정보를 받기 때문에 ", response = UserInfoResponseDto.class)
    public ResponseEntity<UserInfoResponseDto> getMyUserInfo() {
        return ResponseEntity.ok(UserInfoResponseDto.convert(userService.getMyInfo()));
    }

    @PostMapping("/checkEmail")
    @ApiOperation(value = "이메일중복확인", notes="DB에 유저 이메일이 있는지 확인", response = boolean.class)
    public boolean checkEmail(@ApiParam(value = "email", example = "ssafy@naver.com") @RequestBody String email) {
        return userService.checkEmail(email);
    }

    @PostMapping("/user/checkNickname")
    @ApiOperation(value = "닉네임중복확인", notes = "DB에 유저 닉네임이 있는지 확인", response = boolean.class)
    public boolean checkNickname(@ApiParam(value = "nickname", example = "닉네임명")@RequestBody String nickname) {
        return userService.checkNickname(nickname);
    }

    @PutMapping("/user/enrollNickname")
    @ApiOperation(value = "닉네임등록", notes = "유저닉네임 등록하기", response = UserInfoResponseDto.class)
    public ResponseEntity<?> enrollNickname(@ApiParam(value = "nickname", example = "닉네임명")@RequestBody String nickname) {
        return ResponseEntity.ok(userService.enrollNickname(nickname));
    }

    @DeleteMapping("/user/delete")
    @ApiOperation(value = "유저삭제", notes = "현재 접속해 있는 유저를 삭제함", response = void.class)
    public void deleteUser() {
        userService.deleteUser();
    }

    @PostMapping("/user/findUserByNickname")
    @ApiOperation(value = "닉네임으로 유저정보 제공", notes = "유저 정보 제공하기", response = UserInfoResponseDto.class)
    public ResponseEntity<UserInfoResponseDto> userInformation(@ApiParam(value = "nickname", example = "ssafy1!") @RequestBody String nickname) {
        return ResponseEntity.ok(UserInfoResponseDto.convert(userService.userInformation(nickname)));
    }





}
