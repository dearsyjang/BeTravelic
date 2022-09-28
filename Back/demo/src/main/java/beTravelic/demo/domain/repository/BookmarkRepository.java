package beTravelic.demo.domain.repository;

import beTravelic.demo.domain.dto.BookmarkResDto;
import beTravelic.demo.domain.entity.Bookmark;
import beTravelic.demo.domain.entity.Review;
import beTravelic.demo.domain.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;
public interface BookmarkRepository extends JpaRepository<Bookmark, Long> {

    //Optional<Bookmark> findByUserIdAndPlaceId(Long placeId, Long userId);


//    void  deleteByUserIdAndPlaceId(Long placeId, Long userId);
    @Query("SELECT r FROM Bookmark r WHERE r.user.user_id=:user_id AND r.region.regionId=:regionId")
//    ArrayList<ReviewResDto> findAllByUserAndRegion(User user, Region region);
    List<BookmarkResDto> findAllByUserAndRegion(@Param("user_id") Long user_id, @Param("regionId") Long regionId);

    @Query("SELECT r FROM Bookmark r WHERE r.user.user_id=:user_id")
//    ArrayList<ReviewResDto> findAllByUserAndRegion(User user, Region region);
    List<BookmarkResDto> findAllByUser(@Param("user_id") Long user_id);

    Optional<Bookmark> findBookmarkByBookmarkId(long BookmarkId);
}
