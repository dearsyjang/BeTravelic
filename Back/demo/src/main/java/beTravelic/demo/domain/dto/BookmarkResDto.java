package beTravelic.demo.domain.dto;

import beTravelic.demo.domain.entity.Bookmark;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
@AllArgsConstructor
public class BookmarkResDto {
    private Long bookmarkId;
    private Long placeId;

    private Long regionId;
    private String regionName;
    private Long userId;

    private String image;

    public static BookmarkResDto of(Bookmark bookmark) {
        return BookmarkResDto.builder()
                .bookmarkId(bookmark.getBookmarkId())
                .placeId(bookmark.getPlace().getPlaceId())
                .userId(bookmark.getUser().getUser_id())
                .regionId(bookmark.getRegion().getRegionId())
                .regionName(bookmark.getRegion().getDo_gwangyuksi())
                .image(bookmark.getPlace().getImage())
                .build();
    }
    public BookmarkResDto (Bookmark bookmark) {
        this.bookmarkId = bookmark.getBookmarkId();
        this.placeId = bookmark.getPlace().getPlaceId();
        this.userId = bookmark.getUser().getUser_id();
        this.regionId = bookmark.getRegion().getRegionId();
    }
}
