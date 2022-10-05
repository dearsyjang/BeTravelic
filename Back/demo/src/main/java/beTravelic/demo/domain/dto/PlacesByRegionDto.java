package beTravelic.demo.domain.dto;

import beTravelic.demo.domain.entity.MypagePicture;
import beTravelic.demo.domain.entity.Place;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
//@Builder
public class PlacesByRegionDto {
    private Long placeId;

    private String placeName;

    public PlacesByRegionDto(Place place) {
        this.placeId = place.getPlaceId();
        this.placeName = place.getTitle();
    }
}
