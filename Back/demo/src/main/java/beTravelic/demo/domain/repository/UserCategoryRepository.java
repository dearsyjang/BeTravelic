package beTravelic.demo.domain.repository;

import beTravelic.demo.domain.entity.UserCategories;
import beTravelic.demo.domain.entity.UserKeywords;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserCategoryRepository extends JpaRepository<UserCategories, Long> {
}
