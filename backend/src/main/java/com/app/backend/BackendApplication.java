package com.app.backend;

import io.github.cdimascio.dotenv.Dotenv;
import io.github.cdimascio.dotenv.DotenvEntry;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class BackendApplication {

	public static void main(String[] args) {
		for (DotenvEntry entry:Dotenv.load().entries()){
			System.setProperty(entry.getKey(),entry.getValue());
		}
		SpringApplication.run(BackendApplication.class, args);
	}

}
