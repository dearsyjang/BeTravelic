//package beTravelic.demo.domain.dto;
//
//import beTravelic.demo.domain.entity.User;
//import com.fasterxml.jackson.annotation.JsonInclude;
//import lombok.AllArgsConstructor;
//import lombok.Builder;
//import lombok.Data;
//import lombok.NoArgsConstructor;
//
//@Data
//@NoArgsConstructor
//@AllArgsConstructor
//@JsonInclude(value = JsonInclude.Include.NON_NULL)
//@Builder
//public class UserInfoResponseDto {
//    private Long userSeq;
//    private String id;
//    private String pw;
//    private String nickname;
//
//    public static UserInfoResponseDto ofUser(User user){
//        return UserInfoResponseDto.builder()
//                .userSeq(user.getUserSeq())
//                .id(user.getId())
//                .pw(user.getPw())
//                .nickname(user.getNickName())
//                .build();
//    }
//}
