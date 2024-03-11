package com.example.adp.Services.Implementation;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.example.adp.Dto.WishlistDto;
import com.example.adp.Exception.ResourceNotFoundException;
import com.example.adp.Mapper.WishlistMapper;
import com.example.adp.Model.Wishlist;
import com.example.adp.Repository.WishlistRepository;
import com.example.adp.Services.WishlistService;

import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class WishlistServiceImpl implements WishlistService {

    private final WishlistRepository wishlistRepository;

    @Override
    public WishlistDto createWishlistItem(WishlistDto wishlistDto) {
        Wishlist wishlistItem = WishlistMapper.mapToWishlist(wishlistDto);
        Wishlist savedWishlistItem = wishlistRepository.save(wishlistItem);
        return WishlistMapper.mapToWishlistDto(savedWishlistItem);
    }

    @Override
    public WishlistDto getWishlistItemById(Long wishlistItemId) {
        Wishlist wishlistItem = wishlistRepository.findById(wishlistItemId)
                .orElseThrow(() -> new ResourceNotFoundException("WishlistItem not found with id: " + wishlistItemId));
        return WishlistMapper.mapToWishlistDto(wishlistItem);
    }

    @Override
    public List<WishlistDto> getAllWishlistItems() {
        List<Wishlist> wishlistItems = wishlistRepository.findAll();
        return wishlistItems.stream().map(WishlistMapper::mapToWishlistDto).collect(Collectors.toList());
    }

    @Override
    public List<WishlistDto> getWishlistItemsByUserId(Long userId) {
        List<Wishlist> wishlistItems = wishlistRepository.findByUserId(userId);
        if (wishlistItems.isEmpty()) {
            throw new ResourceNotFoundException("No wishlist items found for user with id: " + userId);
        }
        return wishlistItems.stream().map(WishlistMapper::mapToWishlistDto).collect(Collectors.toList());
    }

    @Override
    public WishlistDto updateWishlistItem(Long wishlistItemId, WishlistDto wishlistDto) {
        Wishlist existingWishlistItem = wishlistRepository.findById(wishlistItemId)
                .orElseThrow(() -> new ResourceNotFoundException("WishlistItem not found with id: " + wishlistItemId));
        Wishlist updatedWishlistItem = WishlistMapper.mapToWishlist(wishlistDto);
        updatedWishlistItem.setId(existingWishlistItem.getId());
        Wishlist savedWishlistItem = wishlistRepository.save(updatedWishlistItem);
        return WishlistMapper.mapToWishlistDto(savedWishlistItem);
    }

    @Override
    public void deleteWishlistItem(Long wishlistItemId) {
        wishlistRepository.deleteById(wishlistItemId);
    }
}
