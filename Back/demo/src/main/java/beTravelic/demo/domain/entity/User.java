package beTravelic.demo.domain.entity;

import beTravelic.demo.domain.service.PictureService;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@NoArgsConstructor
@Table(name="user")
public class User  {
    @Id
    @Column(name = "user_id")
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    private Long user_id;
    @Column(name = "id", nullable = false)
    private String id;
    @Column(name = "pw", nullable = false)
    private String pw;
    @Column(name = "nickname")
    private String nickname;
    @Column(name = "email")
    private String email;

    @Column(name = "refresh_token")
    private String refreshToken;

    @Embedded
    @Setter
    private Picture picture;


    @Setter
    @OneToMany(mappedBy = "user")
    private List<UserPlace> userPlaces = new ArrayList<>();

    @Setter
    @OneToMany(mappedBy = "user")
    private List<Review> reviews = new ArrayList<>();

    @Setter
    @OneToMany(mappedBy = "user")
    private List<Comment> comments = new ArrayList<>();

    @Setter
    @OneToMany(mappedBy = "user")
    private List<ReviewLike> reviewLikes = new ArrayList<>();

    @Setter
    @OneToMany(mappedBy = "user")
    private List<SurveyKeyword> surveyKeywords = new ArrayList<>();

    @Setter
    @OneToMany(mappedBy = "user")
    private List<SurveyCategory> surveyCategories = new ArrayList<>();

    @Setter
    @OneToMany(mappedBy = "user")
    private List<MypagePicture> mypagePictures = new ArrayList<>();

    public void updateRefreshToken(String refreshToken){
        this.refreshToken = refreshToken;
    }

    public void setProfile(Picture picture) {
        this.picture = picture;
    }
    @Builder
    public User(String pw, String id, String nickname, String email
    ){
        this.id = id;
        this.pw = pw;
        this.nickname = nickname;
        this.email = email;
//        this.image = "image";
    }

    @Builder(builderClassName = "ReviewUserId", builderMethodName = "ReviewUserId")
    public User(Long user_id) {
        this.user_id = user_id;
    }


}
