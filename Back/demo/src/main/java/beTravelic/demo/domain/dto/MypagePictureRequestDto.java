package beTravelic.demo.domain.dto;

import beTravelic.demo.domain.entity.MypagePicture;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Setter;

@Data
@AllArgsConstructor
public class MypagePictureRequestDto {
    private String region;
    private String image;

    public MypagePicture toMypagePictureEntity(){
        return MypagePicture.builder()
                .region(this.region)
                .image(this.image)
                .build();
    }
}
