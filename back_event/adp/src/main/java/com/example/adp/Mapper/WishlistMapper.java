package com.example.adp.Mapper;

import com.example.adp.Dto.WishlistDto;
import com.example.adp.Model.Wishlist;

public class WishlistMapper {

    public static WishlistDto mapToWishlistDto(Wishlist wishlist) {
        WishlistDto wishlistDto = new WishlistDto();
        wishlistDto.setId(wishlist.getId());
        wishlistDto.setItemName(wishlist.getItemName());
        wishlistDto.setCategory(wishlist.getCategory());
        wishlistDto.setImgUrl(wishlist.getImgUrl());
        wishlistDto.setUserId(wishlist.getUserId()); // Set the user ID
        return wishlistDto;
    }

    public static Wishlist mapToWishlist(WishlistDto wishlistDto) {
        Wishlist wishlist = new Wishlist();
        wishlist.setId(wishlistDto.getId());
        wishlist.setItemName(wishlistDto.getItemName());
        wishlist.setCategory(wishlistDto.getCategory());
        wishlist.setImgUrl(wishlistDto.getImgUrl());
        wishlist.setUserId(wishlistDto.getUserId()); // Set the user ID
        return wishlist;
    }
}
