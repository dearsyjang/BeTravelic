package beTravelic.demo.global.ExceptionHandler;

import beTravelic.demo.global.common.CommonResponse;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class ExceptionHandlerUtil {
//    @ExceptionHandler(NoExistUserException.class)
//    ResponseEntity<CommonResponse> handleNoExistUserException(NoExistUserException e){
//        return ResponseEntity.badRequest().body(CommonResponse.getErrorResponse(e.getMessage()));
//    }
}
