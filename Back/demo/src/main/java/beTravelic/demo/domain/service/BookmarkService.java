package beTravelic.demo.domain.service;

import beTravelic.demo.domain.dto.BookmarkResDto;
import beTravelic.demo.domain.dto.ReviewResDto;
import beTravelic.demo.domain.entity.Bookmark;
import beTravelic.demo.domain.dto.BookmarkSaveRequestDto;
import beTravelic.demo.domain.entity.Place;
import beTravelic.demo.domain.entity.User;
import beTravelic.demo.domain.repository.BookmarkRepository;
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


//    public BookmarkSaveRequestDto saveBookmark(BookmarkSaveRequestDto dto, long placeId, long userId) {
//        User user = userRepository.findUserByUserId(userId).orElseThrow(() ->
////            throw new NoExistUserException();
//            new IllegalArgumentException("유저없음")
//        );
//        Place place = placeRepository.findPlaceByPlaceId(placeId).orElseThrow(() ->
////            throw new NoExistPlaceException();
//            new IllegalArgumentException("장소음슴")
//        );
//        Bookmark bookmark = new Bookmark();
//        bookmarkRepository.save(bookmark);
//        bookmark.setUser(user);
//        bookmark.setPlace(place);
//        return new BookmarkSaveRequestDto(bookmark.getBookmarkId());


    public List<BookmarkResDto> findAllByRegionAndUser(Long regionId, Long user_id) {
//        log.info("게시글 타입으로 게시글 조회하였습니다.");
        return bookmarkRepository.findAllByUserAndRegion(user_id, regionId);
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

