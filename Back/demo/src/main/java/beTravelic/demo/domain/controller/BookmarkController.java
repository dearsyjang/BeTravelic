package beTravelic.demo.domain.controller;


import beTravelic.demo.domain.dto.BookmarkResDto;
import beTravelic.demo.global.common.CommonResponse;
import beTravelic.demo.domain.dto.BookmarkSaveRequestDto;
import beTravelic.demo.domain.service.BookmarkService;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
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

    // 북마크 저장
    @PostMapping
    public ResponseEntity<CommonResponse> bookmarkSave(@RequestParam("id")String id, @RequestParam("placeId") int placeId, @RequestParam("region_id") int regionId){
//        long placeId = (long) request.getAttribute("place_id");
//        long userId = (long) request.getAttribute("user_id");
        bookmarkService.saveBookmark(id, placeId, regionId);
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
    @GetMapping("/user/{user_id}")

    public ResponseEntity<?> getBookmarkByUser(@PathVariable("user_id") Long user_id) {
        List<BookmarkResDto> bookmarks = bookmarkService.findAllByUser(user_id);
        return new ResponseEntity<>(bookmarks, HttpStatus.valueOf(200));
    }
    @GetMapping("/region/{regionId}/user/{user_id}")

    public ResponseEntity<?> getBookmarkByRegionAndUser(@PathVariable("regionId")Long regionId, @PathVariable("user_id") Long user_id) {
    List<BookmarkResDto> bookmarks = bookmarkService.findAllByRegionAndUser(regionId, user_id);
    return new ResponseEntity<>(bookmarks, HttpStatus.valueOf(200));
}

    @DeleteMapping("/{bookmarkId}")
    public ResponseEntity<?> deleteReview(@PathVariable(name="bookmarkId") Long bookmarkId){
        try {
            bookmarkService.deleteById(bookmarkId);
            return new ResponseEntity<>(true, HttpStatus.valueOf(200));
        } catch (Exception e) {
            return new ResponseEntity<>(false, HttpStatus.valueOf(400));
        }
    }
}
