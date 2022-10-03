package beTravelic.demo.domain.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

import javax.persistence.Column;

@Data
@Builder
@AllArgsConstructor
public class MypagePictureResponseDto {
    private Long user_id;
    private String region;
    private String realFileName;
    public static MypagePictureResponseDto of(String region, String realFileName, Long user_id){
        return  MypagePictureResponseDto.builder()
                .realFileName(realFileName)
                .region(region)
                .user_id(user_id)
                .build();
    }
}
