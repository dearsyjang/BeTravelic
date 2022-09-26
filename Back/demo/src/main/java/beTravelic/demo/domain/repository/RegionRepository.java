package beTravelic.demo.domain.repository;

import beTravelic.demo.domain.entity.Region;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RegionRepository extends JpaRepository<Region, Long> {
//    Region findByRegionId(Long region);
}
