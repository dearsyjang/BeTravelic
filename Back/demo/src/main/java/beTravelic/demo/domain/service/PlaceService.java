package beTravelic.demo.domain.service;
import beTravelic.demo.domain.dto.PlacesByRegionDto;
import beTravelic.demo.domain.dto.ReviewResDto;
import beTravelic.demo.domain.entity.Region;
import beTravelic.demo.domain.entity.Review;
import beTravelic.demo.domain.repository.PlaceRepository;
import beTravelic.demo.domain.dto.PlaceResponseDto;
import beTravelic.demo.domain.entity.Place;
import beTravelic.demo.domain.repository.RegionRepository;
import org.springframework.stereotype.Service;
import lombok.RequiredArgsConstructor;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class PlaceService {
    private final PlaceRepository placeRepository;

    private final RegionRepository regionRepository;

    public PlaceResponseDto getPlace(long placeId) {
        Place place = placeRepository.findPlaceByPlaceId(placeId).orElseThrow(() ->
                new RuntimeException("일치하는 여행지 없음"));
        return PlaceResponseDto.of(place);
    }

    public List<PlacesByRegionDto> findPlacesByRegion(Long regionId) {
        Region region = regionRepository.findById(regionId).orElseThrow(() -> new IllegalArgumentException("해당하는 지역이 없습니다."));
        List<Place> places = region.getPlaces();
        return places.stream().map(PlacesByRegionDto::new).collect(Collectors.toList());
    }

}
