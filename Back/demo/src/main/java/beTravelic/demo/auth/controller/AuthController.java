package beTravelic.demo.auth.controller;

import beTravelic.demo.auth.dto.TokenDto;
import beTravelic.demo.auth.dto.TokenRequestDto;
import beTravelic.demo.auth.dto.UserRequestDto;
import beTravelic.demo.auth.dto.UserResponseDto;
import beTravelic.demo.auth.service.AuthService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api")
@Api(tags = "회원등록/토큰관리")
public class AuthController {
    private final AuthService authService;

    @PostMapping("/signup")
    @ApiOperation(value="회원가입", notes="회원가입", response = UserResponseDto.class)
    public ResponseEntity<?> signup(@Valid @RequestBody UserRequestDto userRequestDto) {
        return ResponseEntity.ok(authService.signup(userRequestDto));
    }

    @PostMapping("/login")
    @ApiOperation(value = "로그인", notes="로그인", response = TokenDto.class)
    public ResponseEntity<TokenDto> login(@RequestBody UserRequestDto userRequestDto) {
        return ResponseEntity.ok(authService.login(userRequestDto));
    }

//    @PostMapping("/reissue")
//    @ApiOperation(value = "토큰재발급", notes = "access및 refresh토큰을 재발급한다.", response = TokenDto.class)
//    public ResponseEntity<TokenDto> reissue(@RequestBody TokenRequestDto tokenRequestDto) {
//        return ResponseEntity.ok(authService.reissue(tokenRequestDto));
//    }
//
//    @DeleteMapping("user/logout")
//    @ApiOperation(value = "로그아웃", notes = "refresh토큰 DB에서 삭제")
//    public ResponseEntity<?> logout() {
//        authService.logout();
//        return new ResponseEntity<>(HttpStatus.OK);
//    }
}
