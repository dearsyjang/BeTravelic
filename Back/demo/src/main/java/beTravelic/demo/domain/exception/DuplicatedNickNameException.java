package beTravelic.demo.domain.exception;

public class DuplicatedNickNameException extends RuntimeException{
    public DuplicatedNickNameException(String nickname) {
        super(nickname + "은 존재하는 닉네임 입니다.");
    }
}
