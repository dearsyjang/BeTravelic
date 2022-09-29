package beTravelic.demo.global.config;

import beTravelic.demo.global.util.jwt.AccessTokenInterceptor;
import beTravelic.demo.global.util.jwt.RefreshTokenInterceptor;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Configuration;
import org.springframework.format.FormatterRegistry;
import org.springframework.http.HttpMethod;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import java.util.Arrays;
@Configuration
@RequiredArgsConstructor
public class WebConfig implements WebMvcConfigurer {
    private final AccessTokenInterceptor accessTokenInterceptor;
    private final RefreshTokenInterceptor refreshTokenInterceptor;

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**")
                .allowedOrigins("*")
                .allowedMethods(
                        HttpMethod.GET.name(),
                        HttpMethod.HEAD.name(),
                        HttpMethod.POST.name(),
                        HttpMethod.PUT.name(),
                        HttpMethod.DELETE.name()
                );
    }

//    @Override
//    public void addInterceptors(InterceptorRegistry registry) {
//        registry.addInterceptor(refreshTokenInterceptor).addPathPatterns("/users/access-token");
//        registry.addInterceptor(accessTokenInterceptor).excludePathPatterns(Arrays.asList(
//                new String[]{"/users", "/users/login", "/swagger-ui.html", "/swagger-ui.html/**", "/swagger-resources", "/swagger-resources/**", "/v3/*", "/v3"}));
//    }

}
