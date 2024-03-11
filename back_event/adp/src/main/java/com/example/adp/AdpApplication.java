package com.example.adp;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import com.example.adp.Repository.EnableOpenApi;

@SpringBootApplication
@EnableOpenApi
public class AdpApplication {

	public static void main(String[] args) {
		SpringApplication.run(AdpApplication.class, args);
	}
}
