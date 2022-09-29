package beTravelic.demo.domain.repository;

import beTravelic.demo.domain.entity.Survey;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;


@Repository
public interface SurveyRepository extends JpaRepository<Survey, Long> {

    Optional<Survey> findSurveyByUser_Id(String id);

}
