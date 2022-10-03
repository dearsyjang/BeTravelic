package beTravelic.demo.domain.controller;

import beTravelic.demo.domain.dto.LoginRequestDto;
import beTravelic.demo.domain.dto.ProfileSaveRequestDto;
import beTravelic.demo.domain.dto.SignUpRequestDto;
import beTravelic.demo.domain.service.PictureService;
import beTravelic.demo.domain.service.UserService;
import beTravelic.demo.global.common.CommonResponse;
import beTravelic.demo.global.util.jwt.JwtProvider;
import com.google.cloud.storage.Blob;
import com.google.cloud.storage.BlobInfo;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.repository.query.Param;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.io.IOException;

@RestController
@RequestMapping("/users")
@RequiredArgsConstructor
@Slf4j
public class UserController {
    private final UserService userService;
    private final JwtProvider jwtProvider;
    private final PictureService pictureService;
    @PostMapping
    @ApiOperation(value = "회원가입", notes = "id, pw 입력")
    public ResponseEntity<CommonResponse> signUpUser(@RequestBody SignUpRequestDto dto) throws IOException {
        return new ResponseEntity<>(CommonResponse.getSuccessResponse(userService.signUpUser(dto)), HttpStatus.OK);
    }

    @PostMapping("/login")
    @ApiOperation(value = "로그인", notes = "id, pw 입력")
    public ResponseEntity<CommonResponse> login(@Validated @RequestBody LoginRequestDto dto) throws Exception {
        return new ResponseEntity<>(CommonResponse.getSuccessResponse(userService.login(dto)), HttpStatus.OK);
    }

    @GetMapping("/access-token")
    public ResponseEntity<CommonResponse> getAccessToken(HttpServletRequest request){
        String refreshToken = (String) request.getAttribute("refreshToken");
        return new ResponseEntity<>(CommonResponse.getSuccessResponse(userService.getAccessToken(refreshToken)), HttpStatus.OK);
    }

    @GetMapping
    @ApiOperation(value = "회원 정보 받아오기", notes = "header에 token 담아서 요청")
    public ResponseEntity<CommonResponse> getUserInfo(HttpServletRequest request) throws Exception {
        String accessToken = request.getHeader(HttpHeaders.AUTHORIZATION).split(" ")[0];
        request.setAttribute("id", jwtProvider.getIdFromAccessToken(accessToken));
        String id = (String) request.getAttribute("id");
        return new ResponseEntity<>(CommonResponse.getSuccessResponse(userService.getUserInfo(id)), HttpStatus.OK);
    }


    @GetMapping("/nickname/{nickName}")
    @ApiOperation(value = "닉네임 중복 확인", notes = "닉네임 입력")
    public ResponseEntity<?> checkNickname(@PathVariable("nickName") String nickName) throws Exception {
        return new ResponseEntity<>(CommonResponse.getSuccessResponse(userService.checkNickname(nickName)), HttpStatus.OK);
    }
    @GetMapping("/email/{email}")
    @ApiOperation(value = "이메일 중복 확인", notes = "닉네임 입력")
    public ResponseEntity<?> checkEmail(@PathVariable("email") String email) throws Exception {
        return new ResponseEntity<>(CommonResponse.getSuccessResponse(userService.checkEmail(email)), HttpStatus.OK);
    }
//    @GetMapping(value = "/image", produces = {MediaType.IMAGE_JPEG_VALUE, MediaType.IMAGE_PNG_VALUE, MediaType.IMAGE_PNG_VALUE})
//    @ApiOperation(value = "프로필 사진 받기")
//    public byte[] userProfileImage(HttpServletRequest request) throws Exception {
//        String accessToken = request.getHeader(HttpHeaders.AUTHORIZATION).split(" ")[0];
//        request.setAttribute("id", jwtProvider.getIdFromAccessToken(accessToken));
//        String id = (String) request.getAttribute("id");
//        return pictureService.getUserProfileImage(id);
//    }
//
//    @PostMapping("/image")
//    @ApiOperation(value = "프로필 사진 저장")
//    public ResponseEntity<CommonResponse> userProfileSave(HttpServletRequest request, @RequestBody MultipartFile file) throws Exception {
//        String accessToken = request.getHeader(HttpHeaders.AUTHORIZATION).split(" ")[0];
//        request.setAttribute("id", jwtProvider.getIdFromAccessToken(accessToken));
//        String id = (String) request.getAttribute("id");
//        pictureService.profileSave(id, file);
//        return ResponseEntity.accepted().build();
//    }

    @PostMapping("profile/upload")
    public ResponseEntity localUploadToStorage(HttpServletRequest request, @RequestBody MultipartFile file) throws Exception {
        String accessToken = request.getHeader(HttpHeaders.AUTHORIZATION).split(" ")[0];
        request.setAttribute("id", jwtProvider.getIdFromAccessToken(accessToken));
        String id = (String) request.getAttribute("id");
        String fileFromGCS = pictureService.uploadFileToGCS(id, file);
        return ResponseEntity.ok(fileFromGCS.toString());
    }

    @GetMapping(value = "profile/download")
    @ApiOperation(value = "프로필 사진 받기")
    public String getImage(HttpServletRequest request) throws Exception {
        String accessToken = request.getHeader(HttpHeaders.AUTHORIZATION).split(" ")[0];
        request.setAttribute("id", jwtProvider.getIdFromAccessToken(accessToken));
        String id = (String) request.getAttribute("id");
        return  pictureService.getFileToGCS(id);
    }

}

