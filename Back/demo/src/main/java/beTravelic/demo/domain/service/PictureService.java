package beTravelic.demo.domain.service;

import beTravelic.demo.domain.entity.Picture;
import beTravelic.demo.domain.entity.User;
import beTravelic.demo.domain.exception.NoExistUserException;
//import beTravelic.demo.domain.repository.PictureRepository;
import beTravelic.demo.domain.repository.UserRepository;
import com.google.auth.Credentials;
import com.google.auth.oauth2.GoogleCredentials;
import com.google.cloud.storage.*;
import lombok.RequiredArgsConstructor;
import org.apache.commons.io.IOUtils;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.util.ResourceUtils;
import org.springframework.web.multipart.MultipartFile;

import java.io.*;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class PictureService {
//    private final PictureRepository pictureRepository;

    private final UserRepository userRepository;
    private final Storage storage;
    private File convertMultiPartToFile(MultipartFile file ) throws IOException
    {
        File convFile = new File( file.getOriginalFilename() );
        FileOutputStream fos = new FileOutputStream( convFile );
        fos.write( file.getBytes() );
        fos.close();
        return convFile;
    }
    @Value("${path.image:/image/}")
    private String IMAGE_PATH;
    public String uploadFileToGCS(String id, MultipartFile proFile) throws IOException {


        File path = new File("");
        System.out.println(path.getAbsolutePath());

        Credentials credentials = GoogleCredentials.fromStream(new FileInputStream(path.getAbsolutePath() + "\\src\\main\\resources\\civil-forge-364402-29986bfb28c2.json"));

//        String keyFileName = "";
//        InputStream keyFile = ResourceUtils.getURL(path.getAbsolutePath() + "\\src\\main\\resources\\static/civil-forge-364402-29986bfb28c2.json").openStream();

        Storage storage = StorageOptions.newBuilder().setProjectId("BeTravelic")
                // Key 파일 수동 등록
                .setCredentials(credentials)
                .build().getService();


        Picture picture = null;
        User user = userRepository.findUserById(id).orElseThrow(() ->
                new RuntimeException("일치하는 사용자 없음"));
        String fileName = UUID.randomUUID().toString();
        String contentType = proFile.getContentType();
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

        File convertFile = convertMultiPartToFile( proFile );

//        proFile.transferTo(file);
        user.setProfile(picture);
        userRepository.save(user);

        BlobInfo blobInfo = storage.create(
                BlobInfo.newBuilder("be_travelic", picture.getRealFileName())
                        .setAcl(new ArrayList<>(Arrays.asList(Acl.of(Acl.User.ofAllUsers(), Acl.Role.READER))))
                        .build());

        Blob blob = storage.createFrom(blobInfo, new FileInputStream(convertFile));

//        return blob;
        return blob.getMediaLink();
    }
    public String getFileToGCS(String id) throws IOException {
        User user = userRepository.findUserById(id).orElseThrow(() ->
                new NoExistUserException());
        String profileUrl = "https://storage.googleapis.com/be_travelic/" + user.getPicture().getRealFileName();
        return profileUrl;
    }
//        public byte[] getUserProfileImage(String id) throws IOException {
//        User user = userRepository.findUserById(id).orElseThrow(() ->
//                new NoExistUserException());
//        InputStream inputStream = new FileInputStream("https://storage.googleapis.com/be_travelic/" + user.getPicture().getRealFileName());
//        return IOUtils.toByteArray(inputStream);
//    }

//    @Value("${path.image:/image/}")
//    private String IMAGE_PATH;
//    public void profileSave(String id, MultipartFile proFile) throws Exception{
////        String keyFileName = "civil-forge-364402-176d4136cb9c.json";
////        InputStream keyFile = ResourceUtils.getURL("classpath:" + keyFileName).openStream();
////
////        Storage storage = StorageOptions.newBuilder().setProjectId("BeTravelic")
////                // Key 파일 수동 등록
////                .setCredentials(GoogleCredentials.fromStream(keyFile))
////                .build().getService();
//
//        Picture picture = null;
//        User user = userRepository.findUserById(id).orElseThrow(() ->
//                new RuntimeException("일치하는 사용자 없음"));
//        String fileName = UUID.randomUUID().toString();
//        String contentType = proFile.getContentType();
//        File file = null;
//        if(contentType.contains("image/jpeg")){
//            file = new File(IMAGE_PATH + fileName + ".jpg");
//            picture = Picture.builder().fileName(fileName).realFileName(fileName + ".jpg").build();
//        }else if(contentType.contains("image/png")){
//            file = new File(IMAGE_PATH + fileName + ".png");
//            picture = Picture.builder().fileName(fileName).realFileName(fileName + ".png").build();
//        }else if(contentType.contains("image/gif")){
//            file = new File(IMAGE_PATH + fileName + ".gif");
//            picture = Picture.builder().fileName(fileName).realFileName(fileName + ".gif").build();
//        }else{
//            new RuntimeException("지원하는 사진 형식이 아닙니다");
//        }
//
////        proFile.transferTo(new File(proFile.getOriginalFilename()));
//        proFile.transferTo(file);
//        user.setProfile(picture);
////        user.setPicture(picture);
////        user.setProfileImage(picture);
//        userRepository.save(user);
//    }
//
//    public byte[] getUserProfileImage(String id) throws IOException {
//        User user = userRepository.findUserById(id).orElseThrow(() ->
//                new NoExistUserException());
//        InputStream inputStream = new FileInputStream(IMAGE_PATH + user.getPicture().getRealFileName());
//        return IOUtils.toByteArray(inputStream);
//    }


}
