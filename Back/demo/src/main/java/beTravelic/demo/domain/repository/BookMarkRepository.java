//package beTravelic.demo.domain.repository;
//
//import beTravelic.demo.domain.entity.BookMark;
//import beTravelic.demo.domain.entity.User;
//import org.springframework.data.jpa.repository.JpaRepository;
//import org.springframework.data.jpa.repository.Query;
//
//public interface BookMarkRepository extends JpaRepository<BookMark, Long> {
//
//    @Query("SELECT * FROM bookmark WHERE ")
//    BookMark findAllByUser(User user);
//
//}
