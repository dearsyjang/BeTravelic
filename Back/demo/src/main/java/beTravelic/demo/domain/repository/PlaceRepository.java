package beTravelic.demo.domain.repository;

import beTravelic.demo.domain.entity.Place;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;
@Repository
public interface PlaceRepository extends JpaRepository<Place, Long> {
    Optional<Place> findPlaceByPlaceId(Long placeId);
}
