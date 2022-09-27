package beTravelic.demo.domain.dto;

import beTravelic.demo.domain.entity.Follow;
import lombok.Builder;
import lombok.Data;

@Builder
@Data
public class FollowerListResponseDto {

    private String follower_id;
    private String nickname;

    public static FollowerListResponseDto of(Follow follow){
        return FollowerListResponseDto.builder()
                .follower_id(follow.getFollower().getId())
                .nickname(follow.getFollower().getNickname())
                .build();
    }
}
