package com.example.adp.Services.Implementation;

import com.example.adp.Dto.UserInfoDto;
import com.example.adp.Exception.ResourceNotFoundException;
import com.example.adp.Mapper.UserInfoMapper;
import com.example.adp.Model.UserInfo;
import com.example.adp.Repository.UserInfoRepository;
import com.example.adp.Services.UserInfoService;
import lombok.AllArgsConstructor;

import java.util.*;

import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class UserInfoServiceImpl implements UserInfoService {

    private final UserInfoRepository userInfoRepository;

    @Override
    public UserInfoDto getUserInfoById(Integer userId) {
        UserInfo userInfo = userInfoRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User information not found with id: " + userId));
        return UserInfoMapper.mapToUserInfoDto(userInfo);
    }

    @Override
    public UserInfoDto updateUserInfo(Integer userId, UserInfoDto userInfoDto) {
        UserInfo existingUserInfo = userInfoRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User information not found with id: " + userId));
    
        if(userInfoDto.getName() != null) {
            existingUserInfo.setName(userInfoDto.getName());
        }
        if(userInfoDto.getEmail() != null) {
            existingUserInfo.setEmail(userInfoDto.getEmail());
        }
        if(userInfoDto.getContactNo() != null) {
            existingUserInfo.setContactNo(userInfoDto.getContactNo());
        }
        if(userInfoDto.getCity() != null) {
            existingUserInfo.setCity(userInfoDto.getCity());
        }
        UserInfo savedUserInfo = userInfoRepository.save(existingUserInfo);
        return UserInfoMapper.mapToUserInfoDto(savedUserInfo);
    }
    
    @Override
    public List<String> getUserRolesByName(String username) {
        Optional<UserInfo> userInfoOptional = userInfoRepository.findByName(username);
        if (userInfoOptional.isPresent()) {
            return Collections.singletonList(userInfoOptional.get().getRoles());
        } else {
            throw new ResourceNotFoundException("User information not found with username: " + username);
        }
    }

    @Override
    public Integer getUserIdByName(String username) {
        Optional<UserInfo> userInfoOptional = userInfoRepository.findByName(username);
        if (userInfoOptional.isPresent()) {
            return userInfoOptional.get().getId();
        } else {
            throw new ResourceNotFoundException("User information not found with username: " + username);
        }
    }

    @Override
    public void deleteUserInfo(Integer userId) {
        if (!userInfoRepository.existsById(userId)) {
            throw new ResourceNotFoundException("User information not found with id: " + userId);
        }
        userInfoRepository.deleteById(userId);
    }
}
