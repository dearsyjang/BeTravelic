//package beTravelic.demo.domain.dto;
//
//import beTravelic.demo.domain.entity.MypagePicture;
//import beTravelic.demo.domain.entity.User;
//import lombok.AllArgsConstructor;
//import lombok.Data;
//import lombok.Setter;
//import org.springframework.web.multipart.MultipartFile;
//
//@Data
//@AllArgsConstructor
//public class MypagePictureRequestDto {
//
//    private MultipartFile mypagePicture;
//    private String region;
//
//
//    public User toUserEntity(){
//        return User.builder()
//                .mypagePicture(this.mypagePicture)
//                .mypagePicture.getRegion(this.region)
//                .build();
//    }
//
//}
