package beTravelic.demo.domain.exception;

public class NoExistUserException extends RuntimeException{
    public NoExistUserException() {
        super("존재하지 않는 사용자입니다.");
    }
}
