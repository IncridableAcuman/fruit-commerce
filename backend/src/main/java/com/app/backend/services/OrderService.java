package com.app.backend.services;

import com.app.backend.dto.OrderItemDto;
import com.app.backend.dto.OrderResponse;
import com.app.backend.entities.*;
import com.app.backend.enums.Status;
import com.app.backend.exceptions.BadRequestExceptionHandler;
import com.app.backend.exceptions.NotFoundExceptionHandler;
import com.app.backend.repositories.*;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class OrderService {
    private final OrderRepository orderRepository;
    private final CartRepository cartRepository;

    @Transactional
    public OrderResponse createOrder(Long userId){
        Cart cart=cartRepository.findByUserId(userId).orElseThrow(()->new NotFoundExceptionHandler("Cart not found"));
        if(cart.getCartItems().isEmpty()) throw new BadRequestExceptionHandler("Cart is empty");
        Order order=new Order();
        order.setOrderTime(LocalDateTime.now());
        order.setStatus(Status.PENDING);
        order.setUser(cart.getUser());
        order.setTotalAmount(cart.getTotal());
        List<OrderItem> orderItems=cart.getCartItems()
                .stream()
                .map(orderItem->{
                    OrderItem item=new OrderItem();
                    item.setProduct(orderItem.getProduct());
                    item.setQuantity(orderItem.getQuantity());
                    item.setPrice(orderItem.getQuantity()*orderItem.getProduct().getPrice());
                    item.setOrder(order);
                     return item;
                }).toList();
        order.setOrderItems(orderItems);
        Order saveOrder=orderRepository.save(order);
        cart.getCartItems().clear();
        cart.setTotal(0.0);
        cartRepository.save(cart);
        List<OrderItemDto> itemDtoList=orderItems.stream()
                .map(item->new OrderItemDto(
                        item.getProduct().getId(),
                        item.getQuantity(),
                        item.getPrice(),
                        item.getProduct().getTitle())).toList();
        return new OrderResponse(saveOrder.getId(),saveOrder.getOrderTime(),saveOrder.getStatus(), saveOrder.getTotalAmount(), itemDtoList);
    }
    @Transactional
    public List<OrderResponse> getOrders(Long userId){
        List<Order> orders=orderRepository.findByUserId(userId);
        return orders.stream()
                .map(order->{
                    List<OrderItemDto>  orderItemDtoList=order.getOrderItems()
                            .stream()
                            .map(item->new OrderItemDto(item.getProduct().getId(),
                                    item.getQuantity(),
                                    item.getPrice(),
                                    item.getProduct().getTitle()
                                    )).toList();
                    return new OrderResponse(order.getId(),
                            order.getOrderTime(),
                            order.getStatus(),
                            order.getTotalAmount(),
                            orderItemDtoList
                            );
                }).toList();
    }
}
