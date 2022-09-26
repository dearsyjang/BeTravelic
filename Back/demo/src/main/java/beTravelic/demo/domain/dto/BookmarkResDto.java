package beTravelic.demo.domain.dto;

import beTravelic.demo.domain.entity.Bookmark;
import beTravelic.demo.domain.entity.Review;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.util.Date;
import java.util.List;

@Getter
@Builder
@AllArgsConstructor
public class BookmarkResDto {
    private Long bookmarkId;
    private Long place;

    private Long region;
    private Long user;

    public static BookmarkResDto of(Bookmark bookmark) {
        return BookmarkResDto.builder()
                .bookmarkId(bookmark.getBookmarkId())
                .place(bookmark.getPlace().getPlaceId())
                .user(bookmark.getUser().getUserId())
                .region(bookmark.getRegion().getRegion_id())
                .build();
    }
    public BookmarkResDto (Bookmark bookmark) {
        this.bookmarkId = bookmark.getBookmarkId();
        this.place = bookmark.getPlace().getPlaceId();
        this.user = bookmark.getUser().getUserId();
        this.region = bookmark.getRegion().getRegion_id();
    }
}
