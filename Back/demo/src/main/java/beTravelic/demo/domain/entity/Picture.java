package beTravelic.demo.domain.entity;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.Column;
import javax.persistence.Embeddable;

@Embeddable
@NoArgsConstructor
@Getter
public class Picture {
    @Column(name = "file_name")
    private String fileName;

    // real_file_name
    @Column(name = "real_file_name")
    private String realFileName;

    @Builder
    public Picture(String realFileName, String fileName){
        this.realFileName = realFileName;
        this.fileName = fileName;
    }
}