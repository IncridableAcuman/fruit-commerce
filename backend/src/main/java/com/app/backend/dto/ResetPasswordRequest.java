package com.app.backend.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
public class ResetPasswordRequest {

    private String token;

    @NotBlank(message = "Password must be required")
    @Size(min = 8,max = 1024,message = "Password must between 8 and 1024 character")
    private String password;
}
