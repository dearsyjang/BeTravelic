package beTravelic.demo.domain.dto;

import beTravelic.demo.domain.entity.Region;
import beTravelic.demo.domain.entity.User;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class GetUserRegionReqDto {
    private Long user_id;
    private Long regionId;
}
