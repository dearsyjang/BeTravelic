package beTravelic.demo.domain.exception;

public class NoExistPlaceException extends RuntimeException{
    public NoExistPlaceException() {
        super("존재하지 않는 장소입니다.");
    }
}
