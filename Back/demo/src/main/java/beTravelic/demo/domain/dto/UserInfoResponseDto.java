package beTravelic.demo.domain.dto;

import beTravelic.demo.domain.entity.Follow;
import beTravelic.demo.domain.entity.Survey;
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
    private String keyword;
    private int followerCnt;
    private int followingCnt;
    private int reviewCnt;


    public static UserInfoResponseDto ofUser(User user, Survey survey){
        return UserInfoResponseDto.builder()
                .user_id(user.getUser_id())
                .id(user.getId())
                .pw(user.getPw())
                .nickname(user.getNickname())
                .email(user.getEmail())
                .keyword(survey.getSurveykeyword())
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
