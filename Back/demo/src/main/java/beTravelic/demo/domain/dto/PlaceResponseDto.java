package beTravelic.demo.domain.dto;

import beTravelic.demo.domain.entity.Place;
import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@JsonInclude(value = JsonInclude.Include.NON_NULL)
@Builder
public class PlaceResponseDto {
    private Long placeId;
    private Long categories;
    private Long region;
    private String addr;
    private String title;
    private String image;
    private String mapx;
    private String mapy;
    private Long score;
    private Long content_id;
    private String overview;


    public static PlaceResponseDto of(Place place){
        return PlaceResponseDto.builder()
                .placeId((place.getPlaceId()))
                .categories(place.getCategories().getCategory_id())
                .region(place.getRegion().getRegionId())
                .addr(place.getAddr())
                .title(place.getTitle())
                .image(place.getImage())
                .mapx(place.getMapx())
                .mapy(place.getMapy())
                .score(place.getScore())
                .content_id(place.getContent_id())
                .overview(place.getOverview())
                .build();
}

//    public static PlaceResponseDto of(Long place_id,Long categories,String region,String addr,String title,String image,String mapx,String mapy,Long score,Long content_id, String overview){
//        return PlaceResponseDto.builder()
//                .place_id(place_id)
//                .categories(categories)
//                .region(region)
//                .addr(addr)
//                .title(title)
//                .image(image)
//                .mapx(mapx)
//                .mapy(mapy)
//                .score(score)
//                .content_id(content_id)
//                .overview(overview)
//                .build();
//    }
}
