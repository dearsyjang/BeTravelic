package beTravelic.demo.global.util.jwt;



public class InvalidAccessTokenException extends RuntimeException{
    public InvalidAccessTokenException() {
        super("사용할 수 없는 accessToken 입니다");
    }
}
