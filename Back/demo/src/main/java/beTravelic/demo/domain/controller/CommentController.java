package beTravelic.demo.domain.controller;


import beTravelic.demo.domain.dto.CommentSaveRequestDto;
import beTravelic.demo.domain.dto.CommentUpdateRequestDto;
import beTravelic.demo.domain.entity.Comment;
import beTravelic.demo.domain.service.CommentService;
import beTravelic.demo.global.common.CommonResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("sns/{review_id}/comment")
public class CommentController {

    private final CommentService commentService;
    @PostMapping
    public ResponseEntity<CommonResponse> commentSave(@RequestParam("id") String id, @RequestParam("review_id") Long review_id, CommentSaveRequestDto dto){
        return new ResponseEntity<>(CommonResponse.getSuccessResponse(commentService.commentSave(id, review_id, dto)), HttpStatus.OK);
    }

//    @PutMapping("/{comment_id}")
//    public ResponseEntity<?> commentUpdate(@RequestParam("id") String id, @PathVariable("comment_id") Long comment_id, CommentUpdateRequestDto dto) {
////        return new ResponseEntity<>(CommonResponse.getSuccessResponse(commentService.commentUpdate(id, comment_id, dto)), HttpStatus.OK);
//        try {
//            commentService.commentUpdate(id, comment_id, dto);
//            return new ResponseEntity<>(true, HttpStatus.valueOf(201));
//        } catch (Exception e) {
//            e.printStackTrace();
//            return new ResponseEntity<>(false, HttpStatus.valueOf(500));
//        }
//    }
//
    @DeleteMapping("/{comment_id}")
    public ResponseEntity<?> commentDelete(@RequestParam("id") String id, @RequestParam("comment_id") Long comment_id){
        try {
            commentService.commentDelete(id, comment_id);
            return new ResponseEntity<>(true, HttpStatus.valueOf(200));
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>(false, HttpStatus.valueOf(400));
        }
//        return new ResponseEntity<>(CommonResponse.getSuccessResponse(commentService.commentDelete(id, comment_id)), HttpStatus.OK);
    }



}
