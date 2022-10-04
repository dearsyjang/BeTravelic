package beTravelic.demo.domain.entity;

import lombok.*;

import javax.persistence.*;
import java.util.List;

@Setter
@Getter
@NoArgsConstructor
@Entity
@Table(name="picture")
public class MypagePicture {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    @Column(name = "picture_id")
    private Long pictureId;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    @OneToOne
    @JoinColumn(name = "region_id")
    private Region region;

    // file_name
    @Column(name = "file_name")
    private String fileName;

    // real_file_name
    @Column(name = "real_file_name")
    private String realFileName;

    @Builder
    public MypagePicture(String realFileName, String fileName, Region region, User user){
        this.user = user;
        this.region = region;
        this.fileName = fileName;
        this.realFileName = realFileName;
    }

    public void updateMypagePicture(String realFileName, String fileName){
        this.realFileName = realFileName;
        this.fileName = fileName;
    }
}
