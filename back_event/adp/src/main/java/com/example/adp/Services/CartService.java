package com.example.adp.Services;

import java.util.List;

import com.example.adp.Dto.CartDto;

public interface CartService {
    CartDto createCartItem(CartDto cartDto);

    CartDto getCartItemById(Long cartItemId);

    List<CartDto> getAllCartItems();

    CartDto updateCartItem(Long cartItemId, CartDto cartDto);

    void deleteCartItem(Long cartItemId);
}
