package beTravelic.demo.domain.repository;

import beTravelic.demo.domain.entity.Comment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface CommentRepository extends JpaRepository<Comment, Long> {
//    @Modifying
//    @Query("UPDATE Comment c SET c.contents=:contents WHERE c.user.id=:id")
//    int commentUpdate(String id, String contents);


//    Optional<Comment> findCommentByCommentId(Long commentId);
}
