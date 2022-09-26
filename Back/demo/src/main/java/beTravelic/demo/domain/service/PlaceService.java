package beTravelic.demo.domain.service;
import beTravelic.demo.domain.repository.PlaceRepository;
import beTravelic.demo.domain.dto.PlaceResponseDto;
import beTravelic.demo.domain.entity.Place;
import org.springframework.stereotype.Service;
import lombok.RequiredArgsConstructor;
@Service
@RequiredArgsConstructor
public class PlaceService {
    private final PlaceRepository placeRepository;

    public PlaceResponseDto getPlace(long placeId) {
        Place place = placeRepository.findPlaceByPlaceId(placeId).orElseThrow(() ->
                new RuntimeException("일치하는 여행지 없음"));
        return PlaceResponseDto.of(place);
    }
}
