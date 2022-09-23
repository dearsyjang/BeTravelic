package beTravelic.demo.domain.controller;

import beTravelic.demo.domain.dto.LoginRequestDto;
import beTravelic.demo.domain.dto.SignUpRequestDto;
import beTravelic.demo.domain.service.UserService;
import beTravelic.demo.global.common.CommonResponse;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.io.IOException;

@RestController
@RequestMapping("/users")
@RequiredArgsConstructor
public class UserController {
    private final UserService userService;
    @PostMapping
    @ApiOperation(value = "회원가입", notes = "id, pw 입력")
    public ResponseEntity<CommonResponse> signUpUser(@ModelAttribute @Validated SignUpRequestDto dto) throws IOException {
        return new ResponseEntity<>(CommonResponse.getSuccessResponse(userService.signUpUser(dto)), HttpStatus.OK);
    }

    @GetMapping("/login")
    @ApiOperation(value = "로그인", notes = "id, pw 입력")
    public ResponseEntity<CommonResponse> login(@Validated LoginRequestDto dto) throws Exception {
        return new ResponseEntity<>(CommonResponse.getSuccessResponse(userService.login(dto)), HttpStatus.OK);
    }

    @GetMapping
    public ResponseEntity<CommonResponse> getUserInfo(HttpServletRequest request){
        String id = (String) request.getAttribute("id");
        return new ResponseEntity<>(CommonResponse.getSuccessResponse(userService.getUserInfo(id)), HttpStatus.OK);
    }

    @GetMapping("/nickname/{nickName}")
    @ApiOperation(value = "닉네임 중복 확인", notes = "닉네임 입력")
    public ResponseEntity<?> checkNickname(@PathVariable("nickName") String nickName){
        userService.checkNickname(nickName);
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
