package com.example.adp.Mapper;

import com.example.adp.Dto.UserInfoDto;
import com.example.adp.Model.UserInfo;

public class UserInfoMapper {

    public static UserInfoDto mapToUserInfoDto(UserInfo userInfo) {
        UserInfoDto userInfoDto = new UserInfoDto();
        userInfoDto.setId(userInfo.getId());
        userInfoDto.setName(userInfo.getName());
        userInfoDto.setEmail(userInfo.getEmail());
        userInfoDto.setPassword(userInfo.getPassword());
        userInfoDto.setContactNo(userInfo.getContactNo());
        userInfoDto.setCity(userInfo.getCity());
        userInfoDto.setRoles(userInfo.getRoles());
        return userInfoDto;
    }

    public static UserInfo mapToUserInfo(UserInfoDto userInfoDto) {
        UserInfo userInfo = new UserInfo();
        userInfo.setId(userInfoDto.getId());
        userInfo.setName(userInfoDto.getName());
        userInfo.setEmail(userInfoDto.getEmail());
        userInfo.setPassword(userInfoDto.getPassword());
        userInfo.setContactNo(userInfoDto.getContactNo());
        userInfo.setCity(userInfoDto.getCity());
        userInfo.setRoles(userInfoDto.getRoles());
        return userInfo;
    }
}
