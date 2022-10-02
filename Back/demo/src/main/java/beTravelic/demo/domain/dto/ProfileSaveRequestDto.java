package beTravelic.demo.domain.dto;

import lombok.Data;
import org.springframework.web.multipart.MultipartFile;

@Data
public class ProfileSaveRequestDto {

    private MultipartFile picture;


//    public User toUserPicture(){
//        return User.builder()
//
//    }

}
