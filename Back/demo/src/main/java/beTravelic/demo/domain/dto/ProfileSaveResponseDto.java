package beTravelic.demo.domain.dto;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class ProfileSaveResponseDto {
    private String realFileName;

    public static ProfileSaveResponseDto of(String realFileName){
        return ProfileSaveResponseDto.builder()
                .realFileName(realFileName)
                .build();
    }
}
