package beTravelic.demo.domain.entity;

import lombok.*;

import javax.persistence.*;
import java.util.List;

@Setter
@Getter
@NoArgsConstructor
@Embeddable
@Table(name="picture")
public class MypagePicture {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    @Column(name = "picture_id")
    private Long pictureId;

    @OneToMany(mappedBy = "picture")
//    @JoinColumn(name = "user_id")
    private List<User> user;

    @OneToOne
    @JoinColumn(name = "region_id")
    private Region region;

    // file_name
    @Column(name = "file_name")
    private String fileName;

    // real_file_name
    @Column(name = "real_file_name")
    private String realFileName;



//    @Builder
//    public MypagePicture(String realFileName, String fileName, String region){
//        this.region = region;
//        this.fileName = fileName;
//        this.realFileName = realFileName;
//    }
}
