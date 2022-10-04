package beTravelic.demo.domain.repository;

import beTravelic.demo.domain.dto.ReviewResDto;
import beTravelic.demo.domain.entity.Place;
import beTravelic.demo.domain.entity.Region;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;


@Repository

public interface RegionRepository extends JpaRepository<Region, Long> {

    Optional<Region> findRegionByRegionId(Long regionId);
}
