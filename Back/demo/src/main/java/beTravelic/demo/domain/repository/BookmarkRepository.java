package beTravelic.demo.domain.repository;

import beTravelic.demo.domain.entity.Bookmark;
import beTravelic.demo.domain.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;
public interface BookmarkRepository extends JpaRepository<Bookmark, Long> {

    //Optional<Bookmark> findByUserIdAndPlaceId(Long placeId, Long userId);


//    void  deleteByUserIdAndPlaceId(Long placeId, Long userId);

}
