package beTravelic.demo.domain.controller;


import beTravelic.demo.domain.dto.BookmarkResDto;
import beTravelic.demo.global.common.CommonResponse;
import beTravelic.demo.domain.dto.BookmarkSaveRequestDto;
import beTravelic.demo.domain.service.BookmarkService;
import beTravelic.demo.global.util.jwt.JwtProvider;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import javax.servlet.http.HttpServletRequest;

@RestController
@RequiredArgsConstructor
@RequestMapping("/bookmark")
public class BookmarkController {
    private final BookmarkService bookmarkService;
    private final JwtProvider jwtProvider;

    // 북마크 저장
    @PostMapping
    public ResponseEntity<CommonResponse> bookmarkSave(HttpServletRequest request, @RequestParam("place_id") int place_id, @RequestParam("region_id") int region_id) throws Exception {
        String accessToken = request.getHeader(HttpHeaders.AUTHORIZATION).split(" ")[0];
        request.setAttribute("id", jwtProvider.getIdFromAccessToken(accessToken));
        String id = (String) request.getAttribute("id");
//        long placeId = (long) request.getAttribute("place_id");
//        long userId = (long) request.getAttribute("user_id");
        bookmarkService.saveBookmark(id, place_id, region_id);
        return null;
//        return new ResponseEntity<>(CommonResponse.getSuccessResponse(bookmarkService.saveBookmark(placeId,userId,dto)), HttpStatus.OK);
    }

//    @GetMapping("/{placeId}/{userId}")
//    public ResponseEntity<?> saveBookmark(@RequestBody BookmarkSaveRequestDto bookmarkSaveRequestDto,@PathVariable("placeId") Long placeId, @PathVariable("userId") Long userId) {
//        try {
//            BookmarkSaveRequestDto result = bookmarkService.saveBookmark(bookmarkSaveRequestDto, placeId, userId);
//            return ResponseEntity.ok(result);
//        } catch (IllegalArgumentException e) {
//            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
////        return ResponseEntity.ok(BookmarkService.saveBookmark(placeId, userId));
//        }
//    }
    @GetMapping("/user")
    public ResponseEntity<?> getBookmarkByUser(@RequestParam("user_id") Long user_id) throws Exception {
//        String accessToken = request.getHeader(HttpHeaders.AUTHORIZATION).split(" ")[0];
//        request.setAttribute("id", jwtProvider.getIdFromAccessToken(accessToken));
//        String id = (String) request.getAttribute("id");
        List<BookmarkResDto> bookmarks = bookmarkService.findAllByUser(user_id);
        return new ResponseEntity<>(bookmarks, HttpStatus.valueOf(200));
    }
    @GetMapping("/region/{region_id}/user")
    public ResponseEntity<?> getBookmarkByRegionAndUser(@RequestParam("user_id") Long user_id, @PathVariable("region_id")Long region_id) throws Exception {
//        String accessToken = request.getHeader(HttpHeaders.AUTHORIZATION).split(" ")[0];
//        request.setAttribute("id", jwtProvider.getIdFromAccessToken(accessToken));
//        String id = (String) request.getAttribute("id");
    List<BookmarkResDto> bookmarks = bookmarkService.findAllByRegionAndUser(region_id, user_id);
    return new ResponseEntity<>(bookmarks, HttpStatus.valueOf(200));
}

    @DeleteMapping("/{bookmark_id}")
    public ResponseEntity<?> deleteReview(@PathVariable(name="bookmark_id") Long bookmark_id){
        try {
            bookmarkService.deleteById(bookmark_id);
            return new ResponseEntity<>(true, HttpStatus.valueOf(200));
        } catch (Exception e) {
            return new ResponseEntity<>(false, HttpStatus.valueOf(400));
        }
    }
}
