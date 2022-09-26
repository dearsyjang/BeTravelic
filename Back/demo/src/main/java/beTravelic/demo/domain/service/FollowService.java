package beTravelic.demo.domain.service;

import beTravelic.demo.domain.dto.FollowSaveRequestDto;
import beTravelic.demo.domain.dto.FollowSaveResponseDto;
import beTravelic.demo.domain.dto.FollowerListResponseDto;
import beTravelic.demo.domain.dto.FollowingListResponseDto;
import beTravelic.demo.domain.entity.Follow;
import beTravelic.demo.domain.entity.User;
import beTravelic.demo.domain.repository.FollowRepository;
import beTravelic.demo.domain.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import javax.naming.NoPermissionException;
import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class FollowService {

    public final FollowRepository followRepository;
    public final UserRepository userRepository;

    public FollowSaveResponseDto followSave(String id, String follower_id){
        Follow follow = new Follow();
        User following = userRepository.findUserById(id).orElseThrow(() ->
                new RuntimeException("일치하는 사용자 없음"));
        User follower = userRepository.findUserById(follower_id).orElseThrow(() ->
                new RuntimeException("일치하는 사용자 없음"));
        follow.setFollower(follower);
        follow.setFollowing(following);


        followRepository.save(follow);
        return new FollowSaveResponseDto(follow.getFollow_id());

//        Follow follow = new Follow();
//        User following = userRepository.findUserById(id).orElseThrow(() ->
//                new RuntimeException("일치하는 사용자 없음"));
//        User follower = userRepository.findUserById(dto.getId()).orElseThrow(() ->
//                new RuntimeException("일치하는 사용자 없음"));
//
//        follow.setFollower(follower);
//        follow.setFollowing(following);
//
//        followRepository.save(follow);
//
//        return new FollowSaveResponseDto(follow.getFollow_id());
    }

    public void followDelete(String id, String followId){
        Follow follower = followRepository.findFollowByFollower(followId).orElseThrow(() ->
                new RuntimeException("일치하는 사용자 없음"));
        Follow following = followRepository.findFollowByFollower(followId).orElseThrow(() ->
                new RuntimeException("일치하는 사용자 없음"));

        if(follower.getFollow_id().equals(following.getFollow_id())){
            System.out.println(follower.getFollow_id());
            followRepository.delete(follower);
            followRepository.delete(following);
        }else{
            new RuntimeException("일치하는 사용자 없음");
        }

    }

    public List<FollowingListResponseDto> followingList(String id){
        List<Follow> tmpList = followRepository.findFollowByFollower_Id(id);
        List<FollowingListResponseDto> followingList = new ArrayList<>();

        for (Follow f : tmpList){
            followingList.add(FollowingListResponseDto.of(f));
        }

        return followingList;
    }

    public List<FollowerListResponseDto> followerList(String id){
        List<Follow> tmpList = followRepository.findFollowByFollowing_Id(id);
        List<FollowerListResponseDto> followerList = new ArrayList<>();

        for (Follow f : tmpList){
            followerList.add(FollowerListResponseDto.of(f));
        }

        return followerList;
    }


}
