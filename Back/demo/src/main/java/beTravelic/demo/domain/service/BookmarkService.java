package beTravelic.demo.domain.service;

import beTravelic.demo.domain.dto.BookmarkResDto;
import beTravelic.demo.domain.dto.ReviewResDto;
import beTravelic.demo.domain.entity.*;
import beTravelic.demo.domain.dto.BookmarkSaveRequestDto;
import beTravelic.demo.domain.repository.BookmarkRepository;
import beTravelic.demo.domain.repository.RegionRepository;
import beTravelic.demo.domain.repository.UserRepository;
import beTravelic.demo.domain.repository.PlaceRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

//import org.springframework.util.
import javax.transaction.Transactional;
import java.util.List;
import java.util.Optional;

import beTravelic.demo.domain.exception.NoExistUserException;
import beTravelic.demo.domain.exception.NoExistPlaceException;

@Service
@RequiredArgsConstructor
public class BookmarkService {

    private final BookmarkRepository bookmarkRepository;
    private final UserRepository userRepository;
    private final PlaceRepository placeRepository;

    private final RegionRepository regionRepository;


    public BookmarkSaveRequestDto saveBookmark(String id, long placeId, long regionId) {
        Bookmark bookmark = new Bookmark();
        User user = userRepository.findUserById(id).orElseThrow(() ->
                new IllegalArgumentException("유저없음"));
        Place place = placeRepository.findPlaceByPlaceId(placeId).orElseThrow(() ->
                new IllegalArgumentException("장소음슴"));
        Region region = regionRepository.findRegionByRegionId(regionId).orElseThrow(() ->
                new IllegalArgumentException("장소음슴"));
        bookmark.setUser(user);
        bookmark.setPlace(place);
        bookmark.setRegion(region);
        bookmarkRepository.save(bookmark);
        return new BookmarkSaveRequestDto(bookmark.getBookmarkId());
    }

    //지역별 북마크 조회

    public List<BookmarkResDto> findAllByRegionAndUser(Long regionId, Long userId) {
        return bookmarkRepository.findAllByUserAndRegion(userId, regionId);
    }


    //모든 북마크 조회
    public List<BookmarkResDto> findAllByUser(Long userId) {
        return bookmarkRepository.findAllByUser(userId);
    }


    public void deleteById(Long bookmarkId) throws Exception {
        Bookmark bookmark = bookmarkRepository.findById(bookmarkId).orElse(null);

        if (bookmark == null) {
            throw new Exception("해당하는 bookmark 장소가 없습니다.");
        }

        bookmarkRepository.deleteById(bookmarkId);
    }
//        User user = userRepository.findById(userId);
//        Place place = placeRepository.findById(placeId);
//        bookmarkRepository.findByUserIdAndPlaceId(placeId, userId).orElseThrow(() ->
////            bookmarkRepository.deleteByUserIdAndPlaceId(place,user));
//            new RuntimeException("북마크 음슴~"));
//        return BookmarkSaveRequestDto.toBookmark(place,user);

}

//        if (findLike.isEmpty()) {
//            User user = userRepository.findById(userId).get();
//            Place place = placeRepository.findById(placeId).get();
//            return  new BookmarkSaveRequestDto.toBookmark(user, place);
//
//
//        } else {
//            throw new bookmarkRepository.deleteByUserIdAndPlaceId(placeId, userId);
//        }
//    }

