package com.example.adp.Repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.adp.Model.UserInfo;

import java.util.Optional;

public interface UserInfoRepository extends JpaRepository<UserInfo, Integer> {
    
    Optional<UserInfo> findByName(String username);

}
 