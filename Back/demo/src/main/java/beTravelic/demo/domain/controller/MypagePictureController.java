package beTravelic.demo.domain.controller;

import beTravelic.demo.domain.dto.LoginRequestDto;
import beTravelic.demo.domain.service.MypageService;
import beTravelic.demo.global.common.CommonResponse;
import beTravelic.demo.global.util.jwt.JwtProvider;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletRequest;

@RequiredArgsConstructor
@RequestMapping("/mypage")
@RestController
public class MypagePictureController {
    private final JwtProvider jwtProvider;
    private final MypageService mypageService;

    @PostMapping("/uploadMyPicture")
    @ApiOperation(value = "마이페이지 지도 대표사진 저장", notes = "file, region_id 입력")
    public ResponseEntity<CommonResponse> postMyPicture(HttpServletRequest request, @RequestBody MultipartFile file, @RequestParam("region_id") Long region_id) throws Exception {
        String accessToken = request.getHeader(HttpHeaders.AUTHORIZATION).split(" ")[0];
        request.setAttribute("id", jwtProvider.getIdFromAccessToken(accessToken));
        String id = (String) request.getAttribute("id");
        return new ResponseEntity<>(CommonResponse.getSuccessResponse(mypageService.mypagePictureSave(id, file, region_id)),HttpStatus.OK);
    }

    @GetMapping("/downloadMyPicture")
    @ApiOperation(value = "마이페이지 지도 대표사진 전체 불러오기")
    public ResponseEntity<CommonResponse> getMyPicture(HttpServletRequest request) throws Exception {
        String accessToken = request.getHeader(HttpHeaders.AUTHORIZATION).split(" ")[0];
        request.setAttribute("id", jwtProvider.getIdFromAccessToken(accessToken));
        String id = (String) request.getAttribute("id");
        return new ResponseEntity<>(beTravelic.demo.global.common.CommonResponse.getSuccessResponse(mypageService.getMypagePictures(id)),HttpStatus.OK);
    }

    @PutMapping("/updateMyPicture")
    @ApiOperation(value = "마이페이지 지도 대표사진 수정하기")
    public ResponseEntity<CommonResponse> updateMyPicture(HttpServletRequest request, @RequestBody MultipartFile file, @RequestParam("region_id") Long region_id) throws Exception {
        String accessToken = request.getHeader(HttpHeaders.AUTHORIZATION).split(" ")[0];
        request.setAttribute("id", jwtProvider.getIdFromAccessToken(accessToken));
        String id = (String) request.getAttribute("id");
        return new ResponseEntity<>(beTravelic.demo.global.common.CommonResponse.getSuccessResponse(mypageService.mypagePictureUpdate(id, file, region_id)),HttpStatus.OK);
    }

}
