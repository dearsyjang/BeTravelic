package beTravelic.demo.global.config;

import beTravelic.demo.global.util.jwt.JwtProvider;
import lombok.var;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.annotation.web.configuration.WebSecurityCustomizer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsUtils;

import java.util.Arrays;
import java.util.List;

@Configuration
@EnableWebSecurity
public class SecurityConfig extends WebSecurityConfigurerAdapter {
    @Override
    protected void configure(HttpSecurity http ) throws Exception {
//        http.cors().configurationSource(request ->  {
//            var cors = new CorsConfiguration();
//            cors.setAllowedOrigins(Arrays.asList("/**"));    // setAllowedOrigins() : 허용할 URL
//            cors.setAllowedMethods(Arrays.asList("GET","POST", "PUT", "DELETE", "OPTIONS"));  // setAllowedMethods() : 허용할 Http Method
//            cors.setAllowedHeaders(Arrays.asList("*"));   // setAllowedHeaders() : 허용할 Header
//            return cors;
//        });

        http.csrf().disable();
        http.authorizeRequests()
                .requestMatchers(CorsUtils::isPreFlightRequest).permitAll()
                .antMatchers( "/users", "/users/login","/swagger-ui.html/*", "/swagger-ui.html", "/swagger-ui.html/**", "/swagger-resources", "/swagger-resources/**", "/v3/*", "/v3").permitAll()
                .anyRequest().permitAll();
    }
    @Bean
    public WebSecurityCustomizer webSecurityCustomizer() {
        return web ->
                web.ignoring()
                        .antMatchers(
                                "/users", "/users/login",
                                "/swagger-ui.html/*", "/swagger-ui.html", "/swagger-ui.html/**", "/swagger-resources", "/swagger-resources/**",
                                "/v3/*", "/v3"
                        );
    }
}
