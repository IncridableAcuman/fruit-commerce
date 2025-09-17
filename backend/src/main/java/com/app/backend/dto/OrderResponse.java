package com.app.backend.dto;

import com.app.backend.enums.Status;
import lombok.*;

import java.time.LocalDateTime;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class OrderResponse {
    private Long orderId;
    private LocalDateTime orderTime;
    private Status orderStatus;
    private Double totalAmount;
    private List<OrderItemDto> orderItems;




}
