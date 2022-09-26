package beTravelic.demo.domain.dto;

import beTravelic.demo.domain.entity.Follow;
import lombok.Builder;
import lombok.Data;

@Builder
@Data
public class FollowerListResponseDto {
    private Long id;
    private String follower_id;

    public static FollowerListResponseDto of(Follow follow){
        return FollowerListResponseDto.builder()
                .id(follow.getFollow_id())
                .follower_id(follow.getFollower().getId())
                .build();
    }
}
