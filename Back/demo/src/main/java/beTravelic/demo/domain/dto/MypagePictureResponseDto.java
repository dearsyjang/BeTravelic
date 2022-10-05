package beTravelic.demo.domain.dto;

import beTravelic.demo.domain.entity.MypagePicture;
import beTravelic.demo.domain.entity.User;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

import javax.persistence.Column;

@Data
@Builder
@AllArgsConstructor
public class MypagePictureResponseDto {
    private Long user_id;
    private Long region;
    private String image;
//    private String fileName;
    public static MypagePictureResponseDto of(Long region, String realFileName, Long user_id){
        return  MypagePictureResponseDto.builder()
                .image("https://storage.googleapis.com/be_travelic/" + realFileName)
//                .fileName(realFileName)
                .region(region)
                .user_id(user_id)
                .build();
    }

}
