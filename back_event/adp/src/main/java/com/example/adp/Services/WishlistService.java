package com.example.adp.Services;

import java.util.List;

import com.example.adp.Dto.WishlistDto;

public interface WishlistService {
    WishlistDto createWishlistItem(WishlistDto wishlistDto);

    WishlistDto getWishlistItemById(Long wishlistItemId);

    List<WishlistDto> getAllWishlistItems();
    
    List<WishlistDto> getWishlistItemsByUserId(Long userId);

    WishlistDto updateWishlistItem(Long wishlistItemId, WishlistDto wishlistDto);

    void deleteWishlistItem(Long wishlistItemId);
}
