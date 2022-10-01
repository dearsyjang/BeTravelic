package beTravelic.demo.domain.repository;

import beTravelic.demo.domain.entity.SurveyCategory;
import beTravelic.demo.domain.entity.SurveyKeyword;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;


@Repository
public interface SurveyKeywordRepository extends JpaRepository<SurveyCategory, Long> {

    @Query("SELECT sk.surveyKeyword FROM SurveyKeyword sk WHERE sk.user.id=:id")
    List<String> findSurveyKeywordById(@Param("id")String id);
}
