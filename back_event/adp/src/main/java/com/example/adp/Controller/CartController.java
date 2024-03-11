package com.example.adp.Controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.example.adp.Dto.CartDto;
import com.example.adp.Services.CartService;

import lombok.AllArgsConstructor;

@AllArgsConstructor
@RestController
@CrossOrigin(origins="*")
@RequestMapping("/api/carts")
public class CartController {

    private CartService cartService;

    @PostMapping
    public ResponseEntity<CartDto> createCartItem(@RequestBody CartDto cartDto) {
        CartDto savedCartItem = cartService.createCartItem(cartDto);
        return new ResponseEntity<>(savedCartItem, HttpStatus.CREATED);
    }

    @GetMapping("{id}")
    public ResponseEntity<CartDto> getCartItemById(@PathVariable("id") Long cartItemId) {
        CartDto cartDto = cartService.getCartItemById(cartItemId);
        return ResponseEntity.ok(cartDto);
    }

    @GetMapping
    public ResponseEntity<List<CartDto>> getAllCartItems() {
        List<CartDto> cartItems = cartService.getAllCartItems();
        return ResponseEntity.ok(cartItems);
    }

    @PutMapping("{id}")
    public ResponseEntity<CartDto> updateCartItem(@PathVariable("id") Long cartItemId, @RequestBody CartDto cartDto) {
        CartDto updatedCartItem = cartService.updateCartItem(cartItemId, cartDto);
        return ResponseEntity.ok(updatedCartItem);
    }

    @DeleteMapping("{id}")
    public ResponseEntity<Void> deleteCartItem(@PathVariable("id") Long cartItemId) {
        cartService.deleteCartItem(cartItemId);
        return ResponseEntity.noContent().build();
    }
}
