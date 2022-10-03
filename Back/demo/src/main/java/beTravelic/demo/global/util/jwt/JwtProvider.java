package beTravelic.demo.global.util.jwt;

import io.jsonwebtoken.*;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.security.Key;
import java.util.Date;

@Component
public class JwtProvider {
    private final Key key;
    public JwtProvider(@Value("${jwt.secret}") String secretKey) {
        byte[] keyBytes = Decoders.BASE64.decode(secretKey);
        this.key = Keys.hmacShaKeyFor(keyBytes);
    }
    private final Long ACCESS_TOKEN_EXPIRED_TIME = 1000L * 60 * 60;
    private final Long REFREST_TOKEN_EXPIRED_TIME = 1000L * 60 * 60 * 24 * 14;

    public String getAccessToken(String id, Long user_id){
        Date now = new Date();
        return Jwts.builder().setHeaderParam(Header.TYPE, Header.JWT_TYPE)
                .claim("id", id)
                .claim("user_id", user_id)
                .setIssuer("beTravelic")
                .setIssuedAt(now)
                .setExpiration(new Date(now.getTime() + ACCESS_TOKEN_EXPIRED_TIME))
                .signWith(key, SignatureAlgorithm.HS256)
                .compact();
    }

    public String getRefreshToken(){
        Date now = new Date();
        return Jwts.builder().setHeaderParam(Header.TYPE, Header.JWT_TYPE)
                .setIssuer("beTravelic")
                .setIssuedAt(now)
                .setExpiration(new Date(now.getTime() + REFREST_TOKEN_EXPIRED_TIME))
                .signWith(key, SignatureAlgorithm.HS256)
                .compact();
    }

    public String getIdFromAccessToken(String accessToken) throws Exception{
        String id = (String) Jwts.parserBuilder().setSigningKey(key).build().parseClaimsJws(accessToken).getBody().get("id");
        return  id;
    }
    public Long getUserIdFromAccessToken(String accessToken) throws Exception {
        Long user_id = (Long) Jwts.parserBuilder().setSigningKey(key).build().parseClaimsJws(accessToken).getBody().get("user_id");
        return user_id;
    }

    public boolean isValidToken(String token){
        try {
            Jwts.parserBuilder().setSigningKey(key).build().parseClaimsJws(token);
            return true;
        }catch (Exception e){
            return false;
        }
    }
}
