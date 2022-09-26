package beTravelic.demo.domain.repository;

import beTravelic.demo.domain.entity.UserKeywords;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserKeywordRepository extends JpaRepository<UserKeywords, Long> {

}
