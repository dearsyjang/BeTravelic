package beTravelic.demo.domain.entity;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Getter
@NoArgsConstructor
@Table(name="survey")
public class Survey {

    @Id
    @GeneratedValue
    @Column(name = "surveySeq", insertable = false, updatable = false)
    private long surveySeq;

    @Column(name = "categoryId")
    private Integer categoryId;
    @Column(name = "keywordName")
    private String keywordName;

    @ManyToOne
    @JoinColumn(name = "id")
    private User user;

    @Builder
    public Survey(Integer categoryId, String keywordName){
        this.categoryId = categoryId;
        this.keywordName = keywordName;
    }
    public void setUser(User user){
        user.getSurveys().add(this);
        this.user=user;
    }
}
