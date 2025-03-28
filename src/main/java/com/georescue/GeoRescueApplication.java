package com.georescue;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;

@SpringBootApplication
@EnableScheduling
public class GeoRescueApplication {
    public static void main(String[] args) {
        SpringApplication.run(GeoRescueApplication.class, args);
    }
} 