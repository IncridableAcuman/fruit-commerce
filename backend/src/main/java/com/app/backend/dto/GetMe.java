package com.app.backend.dto;

import com.app.backend.enums.Role;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class GetMe {
    private Long id;
    private String username;
    private Role role;
}
