package beTravelic.demo.domain.dto;

import beTravelic.demo.domain.entity.Follow;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class FollowingListResponseDto {
    private Long user_id;
    private String following_id;
    private String nickname;

    public static FollowingListResponseDto of(Follow follow){
        return FollowingListResponseDto.builder()
                .user_id(follow.getFollower().getUser_id())
                .following_id(follow.getFollower().getId())
                .nickname(follow.getFollower().getNickname())
                .build();
    }
}
