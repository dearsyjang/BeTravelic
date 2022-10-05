package beTravelic.demo.domain.controller;

import beTravelic.demo.domain.dto.MypagePictureViewDto;
import beTravelic.demo.domain.service.MypageService;
import beTravelic.demo.global.common.CommonResponse;
import beTravelic.demo.global.util.jwt.JwtProvider;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletRequest;
import java.util.List;

@RequiredArgsConstructor
@RequestMapping("/mypage")
@RestController
public class MypagePictureController {
    private final JwtProvider jwtProvider;
    private final MypageService mypageService;

    @PostMapping("/uploadMyPicture")
    @ApiOperation(value = "마이페이지 지도 대표사진 저장", notes = "file, region_id 입력")
    public ResponseEntity<CommonResponse> postMyPicture(HttpServletRequest request, @RequestParam MultipartFile file, @RequestParam("region_id") Long region_id) throws Exception {
        String accessToken = request.getHeader(HttpHeaders.AUTHORIZATION).split(" ")[0];
        request.setAttribute("id", jwtProvider.getIdFromAccessToken(accessToken));
        String id = (String) request.getAttribute("id");
        return new ResponseEntity<>(CommonResponse.getSuccessResponse(mypageService.mypagePictureSave(id, file, region_id)),HttpStatus.OK);
    }

    @GetMapping("/downloadMyPicture")
    @ApiOperation(value = "마이페이지 지도 대표사진 전체 불러오기")
    public ResponseEntity<?> getMyPicture(HttpServletRequest request) throws Exception {
        String accessToken = request.getHeader(HttpHeaders.AUTHORIZATION).split(" ")[0];
        request.setAttribute("id", jwtProvider.getIdFromAccessToken(accessToken));
        String id = (String) request.getAttribute("id");
//        List<MypagePicture> mypagePictures = mypageService.getMypagePictures(id);
//        return new ResponseEntity<>(beTravelic.demo.global.common.CommonResponse.getSuccessResponse(mypagePictures),HttpStatus.OK);
        try {
            List<MypagePictureViewDto> mypagePictures = mypageService.findAllByUser(id);
            return ResponseEntity.ok(mypagePictures);
        } catch (IllegalStateException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
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
