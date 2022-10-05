package beTravelic.demo.domain.dto;

//import beTravelic.demo.domain.entity.Survey;
import beTravelic.demo.domain.entity.SurveyKeyword;
import beTravelic.demo.domain.entity.User;
import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@JsonInclude(value = JsonInclude.Include.NON_NULL)
@Builder
public class UserInfoResponseDto {
    private Long user_id;
    private String id;
    private String pw;
    private String nickname;
    private String email;
    private List<String> surveyKeyword;
    private int followerCnt;
    private int followingCnt;
    private int reviewCnt;
//    private String realfileName;

    public static UserInfoResponseDto ofUser(User user, List<String> surveyKeywordList){
//        String gpath = "https://storage.googleapis.com/be_travelic/";
        return UserInfoResponseDto.builder()
                .user_id(user.getUser_id())
                .id(user.getId())
                .pw(user.getPw())
                .nickname(user.getNickname())
                .email(user.getEmail())
                .surveyKeyword(surveyKeywordList)
//                .realfileName("https://storage.googleapis.com/be_travelic/"+user.getPicture().getRealFileName())
//                .realfileName(gpath+user.getPicture().getRealFileName())
                .build();
    }

    public void setFollowerCnt(int followerCnt) {
        this.followerCnt = followerCnt;
    }
    public void setFollowingCnt(int followingCnt) {
        this.followingCnt = followingCnt;
    }

    public void setreviewCnt(int reviewCnt) {
        this.reviewCnt = reviewCnt;
    }
}
