package beTravelic.demo.domain.service;

import beTravelic.demo.domain.dto.ProfileSaveRequestDto;
import beTravelic.demo.domain.dto.ProfileSaveResponseDto;
import beTravelic.demo.domain.entity.Picture;
import beTravelic.demo.domain.entity.User;
import beTravelic.demo.domain.exception.NoExistUserException;
//import beTravelic.demo.domain.repository.PictureRepository;
import beTravelic.demo.domain.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.apache.commons.io.IOUtils;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class PictureService {
//    private final PictureRepository pictureRepository;

    private final UserRepository userRepository;

    @Value("${path.image:/image/}")
    private String IMAGE_PATH;
    public ProfileSaveResponseDto profileSave(String id, ProfileSaveRequestDto dto) throws Exception{
        Picture picture = null;
        User user = userRepository.findUserById(id).orElseThrow(() ->
                new RuntimeException("일치하는 사용자 없음"));
        String fileName = UUID.randomUUID().toString();
        String contentType = dto.getPicture().getContentType();
        File file = null;
        if(contentType.contains("image/jpeg")){
            file = new File(IMAGE_PATH + fileName + ".jpg");
            picture = Picture.builder().fileName(fileName).realFileName(fileName + ".jpg").build();
        }else if(contentType.contains("image/png")){
            file = new File(IMAGE_PATH + fileName + ".png");
            picture = Picture.builder().fileName(fileName).realFileName(fileName + ".png").build();
        }else if(contentType.contains("image/gif")){
            file = new File(IMAGE_PATH + fileName + ".gif");
            picture = Picture.builder().fileName(fileName).realFileName(fileName + ".gif").build();
        }else{
            new RuntimeException("지원하는 사진 형식이 아닙니다");
        }
        dto.getPicture().transferTo(file);
        user.setPicture(picture);
//        user.setProfileImage(picture);
        userRepository.save(user);

        return ProfileSaveResponseDto.of(picture.getRealFileName());
    }

    public byte[] getUserProfileImage(String id) throws IOException {
        User user = userRepository.findUserById(id).orElseThrow(() ->
                new NoExistUserException());
        InputStream inputStream = new FileInputStream(IMAGE_PATH + user.getPicture().getRealFileName());
        return IOUtils.toByteArray(inputStream);
    }

}
