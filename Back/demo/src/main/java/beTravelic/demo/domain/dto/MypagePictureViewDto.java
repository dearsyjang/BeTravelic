package beTravelic.demo.domain.dto;

import beTravelic.demo.domain.entity.MypagePicture;
import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@JsonInclude(value = JsonInclude.Include.NON_NULL)
@Builder
public class MypagePictureViewDto {

    private Long mypagePictureId;
    private String region;
    private String pictureUrl;

    public MypagePictureViewDto(MypagePicture mypagePicture) {
        this.mypagePictureId = mypagePicture.getPictureId();
        this.region = mypagePicture.getRegion().getDo_gwangyuksi();
        this.pictureUrl = mypagePicture.getFileName();
    }
}
