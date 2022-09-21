package beTravelic.demo.global.common;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.AllArgsConstructor;
import lombok.Getter;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.validation.ObjectError;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Getter
@AllArgsConstructor
@JsonInclude(JsonInclude.Include.NON_NULL)
public class CommonResponse <T> {
    private static final String SUCCESS = "success";
    private static final String FAIL = "fail";
    private static final String ERROR = "error";

    private String status;
    private T data;
    private String message;

    public static <T> CommonResponse getSuccessResponse(T data){
        return new CommonResponse(SUCCESS, data, null);
    }

    public static CommonResponse getFailResponse(BindingResult bindingResult){
        Map<String, String> errors = new HashMap<>();
        List<ObjectError> allErrors = bindingResult.getAllErrors();
        for (ObjectError error : allErrors) {
            if (error instanceof FieldError) {
                errors.put(((FieldError) error).getField(), error.getDefaultMessage());
            } else {
                errors.put( error.getObjectName(), error.getDefaultMessage());
            }
        }
        return new CommonResponse(FAIL, errors, null);
    }

    public static CommonResponse getErrorResponse(String message){
        return new CommonResponse(ERROR, null, message);}
}
