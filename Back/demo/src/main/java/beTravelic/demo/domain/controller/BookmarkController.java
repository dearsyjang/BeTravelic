package beTravelic.demo.domain.controller;


import beTravelic.demo.global.common.CommonResponse;
import beTravelic.demo.domain.dto.BookmarkSaveRequestDto;
import beTravelic.demo.domain.service.BookmarkService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import java.util.Map;
import javax.servlet.http.HttpServletRequest;

@RestController
@RequiredArgsConstructor
@RequestMapping("/bookmark")
public class BookmarkController {
    private final BookmarkService bookmarkService;

    // 북마크 저장
//    @PostMapping
//    public ResponseEntity<CommonResponse> bookmarkSave(HttpServletRequest request, @RequestBody @Validated BookmarkSaveRequestDto dto){
//        long placeId = (long) request.getAttribute("place_id");
//        long userId = (long) request.getAttribute("user_id");
//        bookmarkService.saveBookmark(placeId,userId, dto);
//        return new ResponseEntity<>(CommonResponse.getSuccessResponse(bookmarkService.saveBookmark(placeId,userId,dto)), HttpStatus.OK);
//
//
//    }

    @PostMapping("/{placeId}/{userId}")
    public ResponseEntity<?> saveBookmark(@RequestBody BookmarkSaveRequestDto bookmarkSaveRequestDto,@PathVariable("placeId") Long placeId, @PathVariable("userId") Long userId) {
        try {
            BookmarkSaveRequestDto result = bookmarkService.saveBookmark(bookmarkSaveRequestDto, placeId, userId);
            return ResponseEntity.ok(result);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
//        return ResponseEntity.ok(BookmarkService.saveBookmark(placeId, userId));
        }
    }

}
