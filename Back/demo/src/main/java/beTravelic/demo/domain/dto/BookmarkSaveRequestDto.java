package beTravelic.demo.domain.dto;

import beTravelic.demo.domain.entity.Bookmark;
import beTravelic.demo.domain.entity.Place;
import beTravelic.demo.domain.entity.User;
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
public class BookmarkSaveRequestDto {
    private Long bookmarkId;
    private Long userId;
    private Long placeId;



    public BookmarkSaveRequestDto(Bookmark bookmark){
        this.bookmarkId = bookmark.getBookmarkId();
        this.userId = bookmark.getUser().getUserId();
        this.placeId = bookmark.getPlace().getPlaceId();
    }
//    public BookmarkSaveRequestDto of(Bookmark bookmark){
//        return BookmarkSaveRequestDto.builder()
//                .bookmarkId(bookmark.getBookmarkId())
//                .userId(bookmark.getUserId().getUserId())
//                .
//    }
//        this.bookmarkId = bookmark.getBookmarkId();
//        this.userId = bookmark.getUser().getUser_id();
//        this.placeId = bookmark.getPlace().getPlaceId();
//}
//    public static PlaceResponseDto of(Place place){
//        return PlaceResponseDto.builder()
//                .placeId((place.getPlaceId()))
//                .categories(place.getCategories().getCategory_id())
//                .region(place.getRegion().getRegion_id())
//                .addr(place.getAddr())
//                .title(place.getTitle())
//                .image(place.getImage())
//                .mapx(place.getMapx())
//                .mapy(place.getMapy())
//                .score(place.getScore())
//                .content_id(place.getContent_id())
//                .overview(place.getOverview())
//                .build();
}