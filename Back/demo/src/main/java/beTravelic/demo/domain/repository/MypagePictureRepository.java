package beTravelic.demo.domain.repository;

import beTravelic.demo.domain.entity.MypagePicture;
import beTravelic.demo.domain.entity.Picture;
import beTravelic.demo.domain.entity.Region;
import beTravelic.demo.domain.entity.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface MypagePictureRepository extends JpaRepository<MypagePicture, Long> {

    List<MypagePicture> findMypagePicturesByUserId(String id);

    Optional<MypagePicture> findByUserAndRegion(User user, Region region);
//    List<MypagePicture>findMypageListByUserId(String id);

}
