package beTravelic.demo.domain.repository;

import beTravelic.demo.domain.entity.SurveyCategory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;


@Repository
public interface SurveyCategoryRepository extends JpaRepository<SurveyCategory, Long> {

//    @Query("SELECT sc FROM SurveyCategory sc WHERE sc.user.id=:userId")
//    List<SurveyCategory> findSurveyCategoryById(String id);
}
