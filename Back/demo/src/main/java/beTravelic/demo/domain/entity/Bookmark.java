package beTravelic.demo.domain.entity;

import lombok.*;
import beTravelic.demo.domain.entity.User;
import beTravelic.demo.domain.entity.Place;

import javax.persistence.*;

//  북마크
@Entity
@Getter
@Setter
@ToString
@AllArgsConstructor
@NoArgsConstructor
@Table(name="bookmark")
public class Bookmark {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    @Column(name = "bookmark_id")
    private Long bookmarkId;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    @ManyToOne
    @JoinColumn(name = "place_id")
    private Place place;

    @ManyToOne
    @JoinColumn(name = "region_id")
    private Region region;


//    public Bookmark(User user, Place place){
//        this.userId = user;
//        this.placeId = place;
//    }
    public void setUser(User user){
        this.user=user;
        user.getBookmarks().add(this);
    }
    public void setPlace(Place place){
        this.place=place;
//        place.getBookmarks().add(this);
    }
    public void setRegion(Region region){
        this.region=region;
//        place.getBookmarks().add(this);
    }





}
