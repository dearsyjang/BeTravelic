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
//import org.springframework.web.multipart.MultipartFile;
//
//import java.io.File;
//import java.util.List;
//import java.util.UUID;
//
//@Service
//@RequiredArgsConstructor
//public class MypageService {
//    private final UserRepository userRepository;
//    private final PictureService pictureService;
//    @Value("${path.image:/image/}")
//    private String IMAGE_PATH;
//
//    public MypagePictureResponseDto mypagePictureSave(String id, MultipartFile mypagePicture, Long region) throws Exception {
//       String picturUrl = pictureService.uploadFileToGCS(id, mypagePicture);
//    return MypagePictureResponseDto()
//    }
//
//
//
//}
