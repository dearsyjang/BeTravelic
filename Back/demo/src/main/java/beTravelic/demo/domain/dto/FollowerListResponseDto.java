package beTravelic.demo.domain.dto;

import beTravelic.demo.domain.entity.Follow;
import lombok.Builder;
import lombok.Data;

@Builder
@Data
public class FollowerListResponseDto {
    private Long user_id;
    private String follower_id;
    private String nickname;

    public static FollowerListResponseDto of(Follow follow){
        return FollowerListResponseDto.builder()
                .user_id(follow.getFollowing().getUser_id())
                .follower_id(follow.getFollowing().getId())
                .nickname(follow.getFollowing().getNickname())
                .build();
    }
}
