package beTravelic.demo.domain.repository;

import beTravelic.demo.domain.entity.MypagePicture;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface MypagePictureRepository extends JpaRepository<MypagePicture, Long> {
    @Autowired
    Optional<MypagePicture> findMypageByUserId(String id);

    Optional<MypagePicture> findByUserAndRegion(String id, Long region_id);
//    List<MypagePicture>findMypageListByUserId(String id);

}
