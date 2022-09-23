package beTravelic.demo.domain.dto;

import beTravelic.demo.domain.entity.MypagePicture;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

import java.util.List;

@Data
@Builder
public class MypicturesViewResponseDto {
    private String region;
    private String image;

    public static MypicturesViewResponseDto of(MypagePicture mypagePicture){
        return MypicturesViewResponseDto.builder()
                .region(mypagePicture.getRegion())
                .image(mypagePicture.getImage())
                .build();
    }
}
