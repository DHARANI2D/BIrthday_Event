package com.example.adp.Services;

import java.util.List;

import com.example.adp.Dto.UserInfoDto;

public interface UserInfoService {

    UserInfoDto getUserInfoById(Integer userId);

    UserInfoDto updateUserInfo(Integer userId, UserInfoDto userInfoDto);

    void deleteUserInfo(Integer userId);

    List<String> getUserRolesByName(String username);

    Integer getUserIdByName(String username);

}
