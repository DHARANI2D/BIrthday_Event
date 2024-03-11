package com.example.adp.Services.Implementation;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.example.adp.Dto.CartDto;
import com.example.adp.Exception.ResourceNotFoundException;
import com.example.adp.Mapper.CartMapper;
import com.example.adp.Model.Cart;
import com.example.adp.Repository.CartRepository;
import com.example.adp.Services.CartService;

import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class CartServiceImpl implements CartService {

    private final CartRepository cartRepository;

    @Override
    public CartDto createCartItem(CartDto cartDto) {
        Cart cart = CartMapper.mapToCart(cartDto);
        Cart savedCart = cartRepository.save(cart);
        return CartMapper.mapToCartDto(savedCart);
    }

    @Override
    public CartDto getCartItemById(Long cartItemId) {
        Cart cartItem = cartRepository.findById(cartItemId)
                .orElseThrow(() -> new ResourceNotFoundException("CartItem not found with id: " + cartItemId));
        return CartMapper.mapToCartDto(cartItem);
    }

    @Override
    public List<CartDto> getAllCartItems() {
        List<Cart> cartItems = cartRepository.findAll();
        return cartItems.stream().map(CartMapper::mapToCartDto).collect(Collectors.toList());
    }

    @Override
    public CartDto updateCartItem(Long cartItemId, CartDto cartDto) {
        Cart existingCartItem = cartRepository.findById(cartItemId)
                .orElseThrow(() -> new ResourceNotFoundException("CartItem not found with id: " + cartItemId));
        Cart updatedCartItem = CartMapper.mapToCart(cartDto);
        updatedCartItem.setId(existingCartItem.getId());
        Cart savedCartItem = cartRepository.save(updatedCartItem);
        return CartMapper.mapToCartDto(savedCartItem);
    }

    @Override
    public void deleteCartItem(Long cartItemId) {
        cartRepository.deleteById(cartItemId);
    }
}
