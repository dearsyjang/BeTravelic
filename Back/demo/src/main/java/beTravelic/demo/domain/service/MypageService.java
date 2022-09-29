//package beTravelic.demo.domain.service;
//
//import beTravelic.demo.domain.dto.MypagePictureRequestDto;
//import beTravelic.demo.domain.dto.MypagePictureResponseDto;
//import beTravelic.demo.domain.entity.MypagePicture;
//import beTravelic.demo.domain.entity.User;
//import beTravelic.demo.domain.repository.UserRepository;
//import lombok.RequiredArgsConstructor;
//import org.springframework.beans.factory.annotation.Value;
//import org.springframework.stereotype.Service;
//import org.springframework.transaction.annotation.Transactional;
//
//import java.io.File;
//import java.util.List;
//import java.util.UUID;
//
//@Service
//@RequiredArgsConstructor
//public class MypageService {
//    private final UserRepository userRepository;
//
//
//    @Value("${path.image:/image/}")
//    private String IMAGE_PATH;
//
//    public MypagePictureResponseDto mypagePictureSave(String id, MypagePictureRequestDto dto) throws Exception {
//        User user = userRepository.findUserById(id);
//        MypagePicture mypagePicture = null;
//        String fileName = UUID.randomUUID().toString();
//        String contentType = dto.getMypagePicture().getContentType();
//        File file = null;
//        if(contentType.contains("image/jpeg")){
//            file = new File(IMAGE_PATH + fileName + ".jpg");
//            mypagePicture = MypagePicture.builder().fileName(fileName).realFileName(fileName + ".jpg").build();
//        }else if(contentType.contains("image/png")){
//            file = new File(IMAGE_PATH + fileName + ".png");
//            mypagePicture = MypagePicture.builder().fileName(fileName).realFileName(fileName + ".png").build();
//        }else if(contentType.contains("image/gif")){
//            file = new File(IMAGE_PATH + fileName + ".gif");
//            mypagePicture = MypagePicture.builder().fileName(fileName).realFileName(fileName + ".gif").build();
//        }else{
//            new RuntimeException("일치하는 형식이 아닙니다.");
//        }
//        dto.getMypagePicture().transferTo(file);
//        user.set
//    }
//
//
//
//}
